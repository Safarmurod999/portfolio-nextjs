// app/api/technologies/route.ts
import { NextRequest, NextResponse } from "next/server";
import { AppDataSource } from "@/app/lib/datasource";
import { Technologies } from "@/app/lib/entities/Technologies";
import { ILike } from "typeorm";

export async function GET(req: NextRequest) {
  try {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }

    const url = new URL(req.url);
    const queryParams = Object.fromEntries(url.searchParams.entries());

    const technologyRepository = AppDataSource.getRepository(Technologies);

    const where: Record<string, any> = {};
    if (Object.keys(queryParams).length > 0) {
      Object.keys(queryParams).forEach((key) => {
        if (queryParams[key]) {
          where[key] = ILike(`%${queryParams[key]}%`);
        }
      });
    }
    const data = await technologyRepository.find({ where });
    return NextResponse.json(data);
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

    if (!data.name || !data.icon || !data.category_id) {
      return NextResponse.json(
        { error: "Fields are required" },
        { status: 400 }
      );
    }

    const technologyRepository = AppDataSource.getRepository(Technologies);

    const technology = technologyRepository.create({
      name: data.name,
      icon: data.icon,
      category_id: data.category_id,
      active: true,
    });
    await technologyRepository.save(technology);

    return NextResponse.json(technology, { status: 201 });
  } catch (error) {
    console.error("Error creating technology:", error);
    return NextResponse.json(
      { error: "Failed to create technology" },
      { status: 500 }
    );
  }
}
