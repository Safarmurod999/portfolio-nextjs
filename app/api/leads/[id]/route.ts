import { NextResponse } from "next/server";
import { Leads } from "@/app/lib/entities/Leads";
import { connectToDatabase } from "@/app/lib/datasource";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    const connection = await connectToDatabase();
    const leadsRepository = connection.getRepository(Leads);

    const leads = await leadsRepository.findOne({
      where: { id: String(id) },
    });

    if (!leads) {
      return NextResponse.json({ error: "leads not found" }, { status: 404 });
    }

    return NextResponse.json(leads);
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
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const connection = await connectToDatabase();
    const leadsRepository = connection.getRepository(Leads);
    const leads = await leadsRepository.findOne({ where: { id } });
    if (!leads) {
      return NextResponse.json({ error: "leads not found" }, { status: 404 });
    }
    await leadsRepository.delete(id);
    return NextResponse.json({ message: "leads deleted" });
  } catch (error) {
    console.error("Error deleting leads:", error);
    return NextResponse.json(
      { error: "Failed to delete leads" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const data = await request.json();
    const connection = await connectToDatabase();
    const leadsRepository = connection.getRepository(Leads);
    const leads = await leadsRepository.findOne({ where: { id } });
    if (!leads) {
      return NextResponse.json({ error: "Lead not found" }, { status: 404 });
    }
    leads.fullname = data.fullname || leads.fullname;
    leads.email = data.email || leads.email;
    leads.message = data.message || leads.message;
    leads.active = data.active ?? leads.active;
    await leadsRepository.save(leads);
    return NextResponse.json(leads);
  } catch (error) {
    console.error("Error updating leads:", error);
    return NextResponse.json(
      { error: "Failed to update leads" },
      { status: 500 }
    );
  }
}
