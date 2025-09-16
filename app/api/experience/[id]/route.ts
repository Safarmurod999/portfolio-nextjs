import { NextResponse } from "next/server";
import { Experience } from "@/app/lib/entities/Experience";
import { AppDataSource } from "@/app/lib/datasource";
import { withCors } from "@/app/lib/cors";

export async function GET(
  req: Request,
  { params }: { params: { id: number } }
) {
  try {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }
    const { id } = params;
    if (!id) {
      return withCors(
        NextResponse.json({ error: "ID is required" }, { status: 400 })
      );
    }

    const experienceRepository = AppDataSource.getRepository(Experience);

    const experience = await experienceRepository.findOne({
      where: { id },
    });

    if (!experience) {
      return withCors(
        NextResponse.json({ error: "Experience not found" }, { status: 404 })
      );
    }

    return withCors(NextResponse.json(experience));
  } catch (error) {
    console.error("Database error:", error);
    return withCors(
      NextResponse.json({ error: "Failed to fetch data" }, { status: 500 })
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: number } }
) {
  try {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }

    const { id } = params;

    const experienceRepository = AppDataSource.getRepository(Experience);
    const experience = await experienceRepository.findOne({ where: { id } });
    if (!experience) {
      return withCors(
        NextResponse.json({ error: "Experience not found" }, { status: 404 })
      );
    }
    await experienceRepository.delete(id);
    return withCors(NextResponse.json({ message: "Experience deleted" }));
  } catch (error) {
    console.error("Error deleting experience:", error);
    return withCors(
      NextResponse.json(
        { error: "Failed to delete experience" },
        { status: 500 }
      )
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: number } }
) {
  try {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }
    const { id } = params;
    const data = await request.json();

    const experienceRepository = AppDataSource.getRepository(Experience);
    const experience = await experienceRepository.findOne({ where: { id } });
    if (!experience) {
      return withCors(
        NextResponse.json({ error: "Experience not found" }, { status: 404 })
      );
    }

    experience.company = data.company || experience.company;
    experience.jobTitle = data.jobTitle || experience.jobTitle;
    experience.date = data.date || experience.date;
    experience.active = data.active ?? experience.active;
    await experienceRepository.save(experience);
    return withCors(NextResponse.json(experience));
  } catch (error) {
    console.error("Error updating experience:", error);
    return withCors(
      NextResponse.json(
        { error: "Failed to update experience" },
        { status: 500 }
      )
    );
  }
}
