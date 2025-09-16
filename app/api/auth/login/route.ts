import { Users } from "@/app/lib/entities/Users";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { AppDataSource } from "@/app/lib/datasource";
import { withCors } from "@/app/lib/cors";

const SECRET_KEY = process.env.JWT_SECRET || "safarmurod";

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return withCors(
        NextResponse.json(
          { error: "Username and password are required" },
          { status: 400 }
        )
      );
    }
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }
    const usersRepository = AppDataSource.getRepository(Users);

    const user = await usersRepository.findOne({ where: { username } });

    if (!user) {
      return withCors(
        NextResponse.json(
          { error: "Invalid username or password" },
          { status: 401 }
        )
      );
    }

    if (user.password === password) {
      const token = jwt.sign(
        { id: user.id, username: user.username },
        SECRET_KEY,
        { expiresIn: "1h" }
      );
      const response = NextResponse.json({ success: true });

      response.cookies.set("authToken", token, {
        httpOnly: true,
        sameSite: "strict",
        path: "/",
        maxAge: 72000,
      });
      return withCors(response);
    }

    return withCors(
      NextResponse.json(
        { error: "Invalid username or password" },
        { status: 401 }
      )
    );
  } catch (error) {
    console.error("Login error:", error);
    return withCors(
      NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    );
  }
}
