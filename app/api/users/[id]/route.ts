import { NextResponse } from "next/server";
import { Users } from "@/app/lib/entities/Users";
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
    const usersRepository = connection.getRepository(Users);

    const user = await usersRepository.findOne({ where: { id: String(id) } });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}
