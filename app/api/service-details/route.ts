import { NextRequest, NextResponse } from "next/server";
import { AppDataSource } from "@/app/lib/datasource";
import { ServiceDetails } from "@/app/lib/entities/Details";
import { ILike } from "typeorm";
import { withCors } from "@/app/lib/cors";

export async function GET(req: NextRequest) {
  try {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }

    const url = new URL(req.url);
    const queryParams = Object.fromEntries(url.searchParams.entries());

    const serviceDetailsRepository =
      AppDataSource.getRepository(ServiceDetails);

    const where: Record<string, any> = {};
    if (Object.keys(queryParams).length > 0) {
      Object.keys(queryParams).forEach((key) => {
        if (queryParams[key]) {
          where[key] = ILike(`%${queryParams[key]}%`);
        }
      });
    }
    const data = await serviceDetailsRepository.find({
      where,
      relations: ["service"],
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

    if (!data.name || !data.service_id) {
      return withCors(
        NextResponse.json({ error: "Fields are required" }, { status: 400 })
      );
    }

    const serviceDetailsRepository =
      AppDataSource.getRepository(ServiceDetails);

    const serviceDetail = serviceDetailsRepository.create({
      name: data.name,
      service: { id: data.service_id },
      active: true,
    });
    await serviceDetailsRepository.save(serviceDetail);

    return withCors(NextResponse.json(serviceDetail, { status: 201 }));
  } catch (error) {
    console.error("Error creating service detail:", error);
    return withCors(
      NextResponse.json(
        { error: "Failed to create service detail" },
        { status: 500 }
      )
    );
  }
}
