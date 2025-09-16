import { NextRequest, NextResponse } from "next/server";
import { AppDataSource } from "@/app/lib/datasource";
import { Experience } from "@/app/lib/entities/Experience";
import { ILike } from "typeorm";
import { withCors } from "@/app/lib/cors";

export async function GET(req: NextRequest) {
  try {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }

    const url = new URL(req.url);
    const queryParams = Object.fromEntries(url.searchParams.entries());

    const experienceRepository = AppDataSource.getRepository(Experience);

    const where: Record<string, any> = {};
    if (Object.keys(queryParams).length > 0) {
      Object.keys(queryParams).forEach((key) => {
        if (queryParams[key]) {
          where[key] = ILike(`%${queryParams[key]}%`);
        }
      });
    }
    const data = await experienceRepository.find({ where });
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

    if (!data.company || !data.date || !data.jobTitle) {
      return withCors(
        NextResponse.json({ error: "Fields are required" }, { status: 400 })
      );
    }

    const experienceRepository = AppDataSource.getRepository(Experience);

    const experience = experienceRepository.create({
      company: data.company,
      date: data.date,
      jobTitle: data.jobTitle,
      active: true,
    });
    await experienceRepository.save(experience);

    return withCors(NextResponse.json(experience, { status: 201 }));
  } catch (error) {
    console.error("Error creating experience:", error);
    return withCors(
      NextResponse.json(
        { error: "Failed to create experience" },
        { status: 500 }
      )
    );
  }
}
