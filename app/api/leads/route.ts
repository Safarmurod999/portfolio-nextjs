// app/api/leads/route.ts
import { NextRequest, NextResponse } from "next/server";
import { Leads } from "../../lib/entities/Leads";
import { connectToDatabase } from "@/app/lib/datasource";

export async function GET() {
  try {
    const connection = await connectToDatabase();
    const leadsRepository = connection.getRepository(Leads);
    const leads = await leadsRepository.find();
    return NextResponse.json(leads);
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
      !data.fullname ||
      !data.email ||
      !data.message
    ) {
      return NextResponse.json(
        { error: "Fields are required" },
        { status: 400 }
      );
    }

    const connection = await connectToDatabase();

    const leadsRepository = connection.getRepository(Leads);

    const leads = leadsRepository.create({
      fullname: data.fullname,
      email: data.email,
      message: data.message,
      active: true,
    });
    await leadsRepository.save(leads);

    return NextResponse.json(leads, { status: 201 });
  } catch (error) {
    console.error("Error creating leads:", error);
    return NextResponse.json(
      { error: "Failed to create leads" },
      { status: 500 }
    );
  }
}
