import { NextResponse } from "next/server";
import { Education } from "@/app/lib/entities/Education";
import { AppDataSource } from "@/app/lib/datasource";

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
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    const educationRepository = AppDataSource.getRepository(Education);

    const education = await educationRepository.findOne({
      where: { id },
    });

    if (!education) {
      return NextResponse.json(
        { error: "Education not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(education);
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
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

    const educationRepository = AppDataSource.getRepository(Education);
    const education = await educationRepository.findOne({ where: { id } });
    if (!education) {
      return NextResponse.json(
        { error: "Education not found" },
        { status: 404 }
      );
    }
    await educationRepository.delete(id);
    return NextResponse.json({ message: "Education deleted" });
  } catch (error) {
    console.error("Error deleting education:", error);
    return NextResponse.json(
      { error: "Failed to delete education" },
      { status: 500 }
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

    const educationRepository = AppDataSource.getRepository(Education);
    const education = await educationRepository.findOne({ where: { id } });
    if (!education) {
      return NextResponse.json(
        { error: "education not found" },
        { status: 404 }
      );
    }

    (education.name = data.name || education.name),
      (education.active = data.active ?? education.active);
    await educationRepository.save(education);
    return NextResponse.json(education);
  } catch (error) {
    console.error("Error updating education:", error);
    return NextResponse.json(
      { error: "Failed to update education" },
      { status: 500 }
    );
  }
}
