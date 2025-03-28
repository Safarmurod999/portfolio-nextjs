import { NextResponse } from "next/server";
import { Categories } from "@/app/lib/entities/Categories";
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

    const categoryRepository = AppDataSource.getRepository(Categories);

    const category = await categoryRepository.findOne({
      where: { id },
    });

    if (!category) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(category);
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

    const categoryRepository = AppDataSource.getRepository(Categories);
    const category = await categoryRepository.findOne({ where: { id } });
    if (!category) {
      return NextResponse.json(
        { error: "category not found" },
        { status: 404 }
      );
    }
    await categoryRepository.delete(id);
    return NextResponse.json({ message: "category deleted" });
  } catch (error) {
    console.error("Error deleting category:", error);
    return NextResponse.json(
      { error: "Failed to delete category" },
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

    const categoryRepository = AppDataSource.getRepository(Categories);
    const category = await categoryRepository.findOne({ where: { id } });
    if (!category) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 }
      );
    }

    (category.name = data.name || category.name),
      (category.active = data.active ?? category.active);
    await categoryRepository.save(category);
    return NextResponse.json(category);
  } catch (error) {
    console.error("Error updating category:", error);
    return NextResponse.json(
      { error: "Failed to update category" },
      { status: 500 }
    );
  }
}
