// app/api/users/route.ts
import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/app/lib/datasource";
import { Users } from "@/app/lib/entities/Users";
import { ILike } from "typeorm";

export async function GET(req: Request) {
  try {
    // Parse query parameters from the request URL
    const url = new URL(req.url);
    const queryParams = Object.fromEntries(url.searchParams.entries());

    const connection = await connectToDatabase();
    const usersRepository = connection.getRepository(Users);

    const where: Record<string, any> = {};
    if (Object.keys(queryParams).length > 0) {
      Object.keys(queryParams).forEach((key) => {
        if (queryParams[key]) {
          where[key] = ILike(`%${queryParams[key]}%`);
        }
      });
    }

    const users = await usersRepository.find({
      where: Object.keys(where).length > 0 ? where : undefined,
    });
    console.log(Object.keys(where).length > 0 ? where : undefined);

    if (!users || users.length === 0) {
      return NextResponse.json({ error: "No users found" }, { status: 404 });
    }

    return NextResponse.json(users);
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    if (!data.username || !data.password) {
      return NextResponse.json(
        { error: "Fields are required" },
        { status: 400 }
      );
    }

    const connection = await connectToDatabase();

    const userRepository = connection.getRepository(Users);

    const user = userRepository.create({
      username: data.username,
      password: data.password,
      active: true,
    });
    await userRepository.save(user);

    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 }
    );
  }
}
