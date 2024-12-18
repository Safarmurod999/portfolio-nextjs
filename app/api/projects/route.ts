// app/api/users/route.ts
import { NextRequest, NextResponse } from "next/server";
import { Projects } from "../../lib/entities/Projects";
import { connectToDatabase } from "@/app/lib/datasource";

export async function GET() {
  try {
    const connection = await connectToDatabase();
    const projectsRepository = connection.getRepository(Projects);
    const projects = await projectsRepository.find();
    return NextResponse.json(projects);
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
    const data = await request.json();

    if (
      !data.title ||
      !data.description ||
      !data.link ||
      !data.image ||
      !data.category_id ||
      !data.technologies
    ) {
      return NextResponse.json(
        { error: "Fields are required" },
        { status: 400 }
      );
    }

    const connection = await connectToDatabase();

    const projectRepository = connection.getRepository(Projects);

    const project = projectRepository.create({
      title: data.title,
      description: data.description,
      link: data.link,
      image: data.image,
      category_id: data.category_id,
      technologies: data.technologies,
    });
    await projectRepository.save(project);

    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    console.error("Error creating project:", error);
    return NextResponse.json(
      { error: "Failed to create project" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const data = await request.json();
    const connection = await connectToDatabase();
    const projectRepository = connection.getRepository(Projects);
    const project = await projectRepository.findOne(data.id);
    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }
    project.title = data.title;
    await projectRepository.save(project);
    return NextResponse.json(project);
  } catch (error) {
    console.error("Error updating project:", error);
    return NextResponse.json(
      { error: "Failed to update project" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const data = await request.json();
    const connection = await connectToDatabase();
    const projectRepository = connection.getRepository(Projects);
    const project = await projectRepository.findOne(data.id);
    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }
    await projectRepository.remove(project);
    return NextResponse.json({ message: "Project deleted" });
  } catch (error) {
    console.error("Error deleting project:", error);
    return NextResponse.json(
      { error: "Failed to delete project" },
      { status: 500 }
    );
  }
}
