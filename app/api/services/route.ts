import { NextRequest, NextResponse } from "next/server";
import { AppDataSource } from "@/app/lib/datasource";
import { Services } from "@/app/lib/entities/Services";
import { ILike } from "typeorm";
import { withCors } from "@/app/lib/cors";

export async function GET(req: NextRequest) {
  try {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }

    const url = new URL(req.url);
    const queryParams = Object.fromEntries(url.searchParams.entries());

    const serviceRepository = AppDataSource.getRepository(Services);

    const where: Record<string, any> = {};
    if (Object.keys(queryParams).length > 0) {
      Object.keys(queryParams).forEach((key) => {
        if (queryParams[key]) {
          where[key] = ILike(`%${queryParams[key]}%`);
        }
      });
    }
    const data = await serviceRepository.find({
      where,
      relations: ["category"],
    });
    return withCors(NextResponse.json(data));
  } catch (error) {
    console.error("Database error:", error);
    return withCors(
      NextResponse.json({ error: "Failed to fetch data" }, { status: 500 })
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }
    const data = await request.json();

    if (!data.name || !data.category_id) {
      return withCors(
        NextResponse.json({ error: "Fields are required" }, { status: 400 })
      );
    }

    const serviceRepository = AppDataSource.getRepository(Services);

    const service = serviceRepository.create({
      name: data.name,
      category: { id: data.category_id },
      active: true,
    });
    await serviceRepository.save(service);

    return withCors(NextResponse.json(service, { status: 201 }));
  } catch (error) {
    console.error("Error creating service:", error);
    return withCors(
      NextResponse.json({ error: "Failed to create service" }, { status: 500 })
    );
  }
}
