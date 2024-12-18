// app/api/users/route.ts
import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/app/lib/datasource";
import { Categories } from "@/app/lib/entities/Categories";

export async function GET() {
  try {
    const connection = await connectToDatabase();
    const usersRepository = connection.getRepository(Categories);
    const users = await usersRepository.find();
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

    if (!data.name) {
      return NextResponse.json(
        { error: "Fields are required" },
        { status: 400 }
      );
    }

    const connection = await connectToDatabase();

    const categoryRepository = connection.getRepository(Categories);

    const category = categoryRepository.create({
      name: data.name,
    });
    await categoryRepository.save(category);

    return NextResponse.json(category, { status: 201 });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 }
    );
  }
}
