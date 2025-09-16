// app/api/users/route.ts
import { NextRequest, NextResponse } from "next/server";
import { Users } from "@/app/lib/entities/Users";
import { ILike } from "typeorm";
import { AppDataSource } from "@/app/lib/datasource";
import { withCors } from "@/app/lib/cors";

export async function GET(req: NextRequest) {
  try {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }
    const url = new URL(req.url);
    const queryParams = Object.fromEntries(url.searchParams.entries());
    const usersRepository = AppDataSource.getRepository(Users);

    const where: Record<string, any> = {};
    if (Object.keys(queryParams).length > 0) {
      Object.keys(queryParams).forEach((key) => {
        if (queryParams[key]) {
          where[key] = ILike(`%${queryParams[key]}%`);
        }
      });
    }
    const users = await usersRepository.find({ where: where });

    if (!users || users.length === 0) {
      return withCors(
        NextResponse.json({ error: "No users found" }, { status: 404 })
      );
    }

    return withCors(NextResponse.json(users));
  } catch (error) {
    console.error("Database error:", error);
    return withCors(
      NextResponse.json({ error: "Failed to fetch data" }, { status: 500 })
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }
    if (!data.username || !data.password) {
      return withCors(
        NextResponse.json({ error: "Fields are required" }, { status: 400 })
      );
    }

    const userRepository = AppDataSource.getRepository(Users);

    const user = userRepository.create({
      username: data.username,
      password: data.password,
      active: true,
    });
    await userRepository.save(user);

    return withCors(NextResponse.json(user, { status: 201 }));
  } catch (error) {
    console.error("Error creating user:", error);
    return withCors(
      NextResponse.json({ error: "Failed to create user" }, { status: 500 })
    );
  }
}
