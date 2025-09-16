import { NextResponse } from "next/server";
import { ServiceDetails } from "@/app/lib/entities/Details";
import { AppDataSource } from "@/app/lib/datasource";
import { withCors } from "@/app/lib/cors";
import { Services } from "@/app/lib/entities/Services";

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

    const serviceDetailsRepository =
      AppDataSource.getRepository(ServiceDetails);

    const serviceDetails = await serviceDetailsRepository.findOne({
      where: { id },
      relations: ["service"],
    });

    if (!serviceDetails) {
      return withCors(
        NextResponse.json(
          { error: "ServiceDetails not found" },
          { status: 404 }
        )
      );
    }

    return withCors(NextResponse.json(serviceDetails));
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

    const serviceDetailsRepository =
      AppDataSource.getRepository(ServiceDetails);
    const serviceDetails = await serviceDetailsRepository.findOne({
      where: { id },
    });
    if (!serviceDetails) {
      return withCors(
        NextResponse.json(
          { error: "ServiceDetails not found" },
          { status: 404 }
        )
      );
    }
    await serviceDetailsRepository.delete(id);
    return withCors(NextResponse.json({ message: "ServiceDetails deleted" }));
  } catch (error) {
    console.error("Error deleting ServiceDetails:", error);
    return withCors(
      NextResponse.json(
        { error: "Failed to delete ServiceDetails" },
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

    const serviceDetailsRepository =
      AppDataSource.getRepository(ServiceDetails);
    const servicesRepository = AppDataSource.getRepository(Services);

    const serviceDetails = await serviceDetailsRepository.findOne({
      where: { id: Number(id) },
      relations: ["service"],
    });

    if (!serviceDetails) {
      return withCors(
        NextResponse.json(
          { error: "ServiceDetails not found" },
          { status: 404 }
        )
      );
    }

    serviceDetails.name = data.name ?? serviceDetails.name;
    serviceDetails.active = data.active ?? serviceDetails.active;

    if (data.service_id) {
      const service = await servicesRepository.findOneBy({
        id: data.service_id,
      });
      if (!service) {
        return withCors(
          NextResponse.json({ error: "Service not found" }, { status: 400 })
        );
      }
      serviceDetails.service = service;
    }

    await serviceDetailsRepository.save(serviceDetails);

    return withCors(NextResponse.json(serviceDetails));
  } catch (error) {
    console.error("Error updating ServiceDetails:", error);
    return withCors(
      NextResponse.json(
        { error: "Failed to update ServiceDetails" },
        { status: 500 }
      )
    );
  }
}
