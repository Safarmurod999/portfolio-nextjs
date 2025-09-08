// app/api/users/route.ts
import { NextRequest, NextResponse } from "next/server";
import { Users } from "@/app/lib/entities/Users";
import { ILike } from "typeorm";
import { AppDataSource } from "@/app/lib/datasource";

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
    const users = await usersRepository.find({where: where});

    if (!users || users.length === 0) {
      return NextResponse.json({ error: "No users found" }, { status: 404 });
    }

    const headers = new Headers();
    headers.set("Access-Control-Allow-Origin", "*"); 
    headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    headers.set("Access-Control-Allow-Headers", "*");

    return NextResponse.json(users, { headers });
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
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }    
    if (!data.username || !data.password) {
      return NextResponse.json(
        { error: "Fields are required" },
        { status: 400 }
      );
    }

    const userRepository = AppDataSource.getRepository(Users);

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
