import { AppDataSource } from "@/app/lib/datasource";
import { NextRequest, NextResponse } from "next/server";
import { Leads } from "../../lib/entities/Leads";
import { ILike } from "typeorm";
import { withCors } from "@/app/lib/cors";

export async function GET(req: NextRequest) {
  try {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }

    const url = new URL(req.url);
    const queryParams = Object.fromEntries(url.searchParams.entries());

    const leadsRepository = AppDataSource.getRepository(Leads);

    const where: Record<string, any> = {};
    if (Object.keys(queryParams).length > 0) {
      Object.keys(queryParams).forEach((key) => {
        if (queryParams[key]) {
          where[key] = ILike(`%${queryParams[key]}%`);
        }
      });
    }
    const leads = await leadsRepository.find({ where });
    return withCors(NextResponse.json(leads));
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
    const data = await request.json();

    if (!data.fullname || !data.email || !data.message) {
      return withCors(
        NextResponse.json({ error: "Fields are required" }, { status: 400 })
      );
    }

    const leadsRepository = AppDataSource.getRepository(Leads);

    const leads = leadsRepository.create({
      fullname: data.fullname,
      email: data.email,
      message: data.message,
      active: true,
    });
    await leadsRepository.save(leads);

    return withCors(NextResponse.json(leads, { status: 201 }));
  } catch (error) {
    console.error("Error creating leads:", error);
    return withCors(
      NextResponse.json({ error: "Failed to create leads" }, { status: 500 })
    );
  }
}
