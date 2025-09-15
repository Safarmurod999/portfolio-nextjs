import { NextRequest, NextResponse } from "next/server";
import { Projects } from "@/app/lib/entities/Projects";
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

    const projectRepository = AppDataSource.getRepository(Projects);

    const project = await projectRepository.findOne({
      where: { id },
    });

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json(project);
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

    const projectRepository = AppDataSource.getRepository(Projects);
    const project = await projectRepository.findOne({ where: { id } });
    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }
    await projectRepository.delete(id);
    return NextResponse.json({ message: "Project deleted" });
  } catch (error) {
    console.error("Error deleting project:", error);
    return NextResponse.json(
      { error: "Failed to delete project" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }

    const formData = await request.formData();

    const id = formData.get("id") as string;
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const link = formData.get("link") as string;
    const category_id = formData.get("category_id") as string;
    const technologies = formData.get("technologies") as string;
    const image = formData.get("image") as File | null;
    const active = formData.get("active") as string | null;

    if (!id) {
      return NextResponse.json(
        { error: "Project ID is required" },
        { status: 400 }
      );
    }

    const projectRepository = AppDataSource.getRepository(Projects);
    const project = await projectRepository.findOneBy({ id: parseInt(id) });

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    project.title = title || project.title;
    project.description = description || project.description;
    project.link = link || project.link;
    project.category_id = parseInt(category_id) || project.category_id;
    project.technologies = JSON.parse(technologies) || project.technologies;
    project.active =
      active === "true" ? true : active === "false" ? false : project.active;
    if (image) {
      const bytes = await image.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const fs = require("fs");
      const path = require("path");
      const uploadDir = path.join(process.cwd(), "public", "uploads");
      if (!fs.existsSync(uploadDir))
        fs.mkdirSync(uploadDir, { recursive: true });

      const filePath = path.join(uploadDir, image.name);
      fs.writeFileSync(filePath, buffer);

      project.image = `/uploads/${image.name}`;
    }

    await projectRepository.save(project);

    return NextResponse.json(project, { status: 200 });
  } catch (error) {
    console.error("Error updating project:", error);
    return NextResponse.json(
      { error: "Failed to update project" },
      { status: 500 }
    );
  }
}
