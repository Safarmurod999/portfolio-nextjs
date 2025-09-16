import { NextRequest, NextResponse } from "next/server";
import { Projects } from "../../lib/entities/Projects";
import { AppDataSource } from "@/app/lib/datasource";
import { ILike } from "typeorm";
import { withCors } from "@/app/lib/cors";

export async function GET(req: NextRequest) {
  try {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }

    const url = new URL(req.url);
    const queryParams = Object.fromEntries(url.searchParams.entries());
    const projectsRepository = AppDataSource.getRepository(Projects);
    const where: Record<string, any> = {};
    if (Object.keys(queryParams).length > 0) {
      Object.keys(queryParams).forEach((key) => {
        if (queryParams[key]) {
          where[key] = ILike(`%${queryParams[key]}%`);
        }
      });
    }
    const projects = await projectsRepository.find({ where });
    return withCors(NextResponse.json(projects));
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

    const formData = await request.formData();

    const title = formData.get("title") as string | null;
    const description = formData.get("description") as string | null;
    const link = formData.get("link") as string | null;
    const category_id = formData.get("category_id") as string | null;
    const technologies = formData.get("technologies") as string | null;
    const image = formData.get("image") as File | null;

    if (
      !title ||
      !description ||
      !link ||
      !category_id ||
      !technologies ||
      !image
    ) {
      return withCors(
        NextResponse.json({ error: "All fields are required" }, { status: 400 })
      );
    }

    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const fs = require("fs");
    const path = require("path");
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

    const filePath = path.join(uploadDir, image.name);
    fs.writeFileSync(filePath, buffer);

    const projectRepository = AppDataSource.getRepository(Projects);
    const project = projectRepository.create({
      title,
      description,
      link,
      image: `/uploads/${image.name}`,
      category_id: parseInt(category_id),
      technologies: JSON.parse(technologies),
      active: true,
    });

    await projectRepository.save(project);

    return withCors(NextResponse.json(project, { status: 201 }));
  } catch (error) {
    console.error("Error creating project:", error);
    return withCors(
      NextResponse.json({ error: "Failed to create project" }, { status: 500 })
    );
  }
}
