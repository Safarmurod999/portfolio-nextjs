import { NextResponse } from "next/server";
import { Users } from "@/app/lib/entities/Users";
import { AppDataSource } from "@/app/lib/datasource";

export async function GET(
  req: Request,
  { params }: { params: { id?: string } }
) {
  try {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }
    const usersRepository = AppDataSource.getRepository(Users);

    const users = await usersRepository.findOne({
      where: { id: params.id as unknown as number },
    });

    if (!users) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
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
  { params }: { params: { id: number } }
) {
  try {
    const { id } = params;
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }
    const userRepository = AppDataSource.getRepository(Users);
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
  { params }: { params: { id: number } }
) {
  try {
    const { id } = params;
    const data = await request.json();
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }
    const userRepository = AppDataSource.getRepository(Users);
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
