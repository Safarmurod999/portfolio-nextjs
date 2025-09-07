// app/api/education/route.ts
import { NextRequest, NextResponse } from "next/server";
import { AppDataSource } from "@/app/lib/datasource";
import { Education } from "@/app/lib/entities/Education";

export async function GET() {
  try {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }
    const educationRepository = AppDataSource.getRepository(Education);
    const data = await educationRepository.find();
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

    if (!data.name || !data.date || !data.place) {
      return NextResponse.json(
        { error: "Fields are required" },
        { status: 400 }
      );
    }

    const educationRepository = AppDataSource.getRepository(Education);

    const education = educationRepository.create({
      name: data.name,
      date: data.date,
      place: data.place,
      active: true,
    });
    await educationRepository.save(education);

    return NextResponse.json(education, { status: 201 });
  } catch (error) {
    console.error("Error creating education:", error);
    return NextResponse.json(
      { error: "Failed to create education" },
      { status: 500 }
    );
  }
}
