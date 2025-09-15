import { NextResponse } from "next/server";
import { Technologies } from "@/app/lib/entities/Technologies";
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

    const technologyRepository = AppDataSource.getRepository(Technologies);

    const technology = await technologyRepository.findOne({
      where: { id },
    });

    if (!technology) {
      return NextResponse.json(
        { error: "Technology not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(technology);
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

    const technologyRepository = AppDataSource.getRepository(Technologies);
    const technology = await technologyRepository.findOne({ where: { id } });
    if (!technology) {
      return NextResponse.json(
        { error: "Technology not found" },
        { status: 404 }
      );
    }
    await technologyRepository.delete(id);
    return NextResponse.json({ message: "Technology deleted" });
  } catch (error) {
    console.error("Error deleting technology:", error);
    return NextResponse.json(
      { error: "Failed to delete technology" },
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

    const technologyRepository = AppDataSource.getRepository(Technologies);
    const technology = await technologyRepository.findOne({ where: { id } });
    if (!technology) {
      return NextResponse.json(
        { error: "Technology not found" },
        { status: 404 }
      );
    }

    technology.name = data.name || technology.name;
    technology.icon = data.icon || technology.icon;
    technology.category_id = data.category_id || technology.category_id;
    technology.active = data.active ?? technology.active;
    await technologyRepository.save(technology);
    return NextResponse.json(technology);
  } catch (error) {
    console.error("Error updating technology:", error);
    return NextResponse.json(
      { error: "Failed to update technology" },
      { status: 500 }
    );
  }
}
