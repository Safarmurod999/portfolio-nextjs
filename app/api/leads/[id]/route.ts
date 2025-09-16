import { NextResponse } from "next/server";
import { Leads } from "@/app/lib/entities/Leads";
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

    const leadsRepository = AppDataSource.getRepository(Leads);

    const leads = await leadsRepository.findOne({
      where: { id },
    });

    if (!leads) {
      return withCors(
        NextResponse.json({ error: "leads not found" }, { status: 404 })
      );
    }

    return withCors(NextResponse.json(leads));
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

    const leadsRepository = AppDataSource.getRepository(Leads);
    const leads = await leadsRepository.findOne({ where: { id } });
    if (!leads) {
      return withCors(
        NextResponse.json({ error: "leads not found" }, { status: 404 })
      );
    }
    await leadsRepository.delete(id);
    return withCors(NextResponse.json({ message: "leads deleted" }));
  } catch (error) {
    console.error("Error deleting leads:", error);
    return withCors(
      NextResponse.json({ error: "Failed to delete leads" }, { status: 500 })
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

    const leadsRepository = AppDataSource.getRepository(Leads);
    const leads = await leadsRepository.findOne({ where: { id } });
    if (!leads) {
      return withCors(
        NextResponse.json({ error: "Lead not found" }, { status: 404 })
      );
    }
    leads.fullname = data.fullname || leads.fullname;
    leads.email = data.email || leads.email;
    leads.message = data.message || leads.message;
    leads.active = data.active ?? leads.active;
    await leadsRepository.save(leads);
    return withCors(NextResponse.json(leads));
  } catch (error) {
    console.error("Error updating leads:", error);
    return withCors(
      NextResponse.json({ error: "Failed to update leads" }, { status: 500 })
    );
  }
}
