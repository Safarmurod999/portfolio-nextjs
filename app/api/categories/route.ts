// app/api/users/route.ts
import { NextRequest, NextResponse } from "next/server";
import { AppDataSource } from "@/app/lib/datasource";
import { Categories } from "@/app/lib/entities/Categories";
import { ILike } from "typeorm";

export async function GET(req: NextRequest) {
  try {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }

    const url = new URL(req.url);
    const queryParams = Object.fromEntries(url.searchParams.entries());
    const categoryRepository = AppDataSource.getRepository(Categories);

    const where: Record<string, any> = {};
    if (Object.keys(queryParams).length > 0) {
      Object.keys(queryParams).forEach((key) => {
        if (queryParams[key]) {
          where[key] = ILike(`%${queryParams[key]}%`);
        }
      });
    }

    const categories = await categoryRepository.find({
      where,
    });
    return NextResponse.json(categories);
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
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }
    const data = await request.json();

    if (!data.name) {
      return NextResponse.json(
        { error: "Fields are required" },
        { status: 400 }
      );
    }

    const categoryRepository = AppDataSource.getRepository(Categories);

    const category = categoryRepository.create({
      name: data.name,
      active: true,
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
