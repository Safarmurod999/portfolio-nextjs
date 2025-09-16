import { NextResponse } from "next/server";
import { Services } from "@/app/lib/entities/Services";
import { AppDataSource } from "@/app/lib/datasource";
import { withCors } from "@/app/lib/cors";
import { Categories } from "@/app/lib/entities/Categories";

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

    const serviceRepository = AppDataSource.getRepository(Services);

    const service = await serviceRepository.findOne({
      where: { id },
      relations: ["category"],
    });

    if (!service) {
      return withCors(
        NextResponse.json({ error: "Service not found" }, { status: 404 })
      );
    }

    return withCors(NextResponse.json(service));
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

    const serviceRepository = AppDataSource.getRepository(Services);
    const service = await serviceRepository.findOne({ where: { id } });
    if (!service) {
      return withCors(
        NextResponse.json({ error: "Service not found" }, { status: 404 })
      );
    }
    await serviceRepository.delete(id);
    return withCors(NextResponse.json({ message: "Service deleted" }));
  } catch (error) {
    console.error("Error deleting service:", error);
    return withCors(
      NextResponse.json({ error: "Failed to delete service" }, { status: 500 })
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

    const serviceRepository = AppDataSource.getRepository(Services);
    const categoryRepository = AppDataSource.getRepository(Categories);

    const service = await serviceRepository.findOne({
      where: { id: Number(id) },
      relations: ["category"], // agar relation bor bo‘lsa
    });

    if (!service) {
      return withCors(
        NextResponse.json({ error: "Service not found" }, { status: 404 })
      );
    }

    // oddiy fieldlarni yangilash
    service.name = data.name ?? service.name;
    service.active = data.active ?? service.active;

    // agar category_id kelgan bo‘lsa, yangilab qo‘yish
    if (data.category_id) {
      const category = await categoryRepository.findOneBy({
        id: data.category_id,
      });
      if (!category) {
        return withCors(
          NextResponse.json({ error: "Category not found" }, { status: 400 })
        );
      }
      service.category = category;
    }

    await serviceRepository.save(service);

    return withCors(NextResponse.json(service));
  } catch (error) {
    console.error("Error updating service:", error);
    return withCors(
      NextResponse.json({ error: "Failed to update service" }, { status: 500 })
    );
  }
}
