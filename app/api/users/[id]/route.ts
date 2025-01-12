import { NextResponse } from "next/server";
import { Users } from "@/app/lib/entities/Users";
import { connectToDatabase } from "@/app/lib/datasource";

export async function GET(
  req: Request,
  { params }: { params: { id?: string } }
) {
  try {
    const url = new URL(req.url);
    const queryParams = Object.fromEntries(url.searchParams.entries());

    const connection = await connectToDatabase();
    const usersRepository = connection.getRepository(Users);

    const where: Record<string, any> = {};

    if (params.id) {
      where.id = params.id;
    } else {
      Object.keys(queryParams).forEach((key) => {
        if (queryParams[key]) {
          where[key] = queryParams[key];
        }
      });
    }
    const users = await usersRepository.find({ where });

    if (!users || users.length === 0) {
      return NextResponse.json({ error: "No users found" }, { status: 404 });
    }

    return NextResponse.json(users);
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
    const userRepository = connection.getRepository(Users);
    const user = await userRepository.findOne({ where: { id } });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    await userRepository.delete(id);
    return NextResponse.json({ message: "User deleted" });
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json(
      { error: "Failed to delete user" },
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
    const userRepository = connection.getRepository(Users);
    const user = await userRepository.findOne({ where: { id } });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    (user.username = data.username || user.username),
      (user.password = data.password || user.password),
      (user.active = data.active ?? user.active);
    await userRepository.save(user);
    return NextResponse.json(user);
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      { error: "Failed to update user" },
      { status: 500 }
    );
  }
}
