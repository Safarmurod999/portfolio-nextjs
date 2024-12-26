// app/api/users/route.ts
import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/app/lib/datasource";
import { Users } from "@/app/lib/entities/Users";

export async function GET() {
  try {
    const connection = await connectToDatabase();
    const usersRepository = connection.getRepository(Users);
    const users = await usersRepository.find();
    return NextResponse.json(users);
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

    if (!data.username || !data.password) {
      return NextResponse.json(
        { error: "Fields are required" },
        { status: 400 }
      );
    }

    const connection = await connectToDatabase();

    const userRepository = connection.getRepository(Users);

    const user = userRepository.create({
      username: data.username,
      password: data.password,
    });
    await userRepository.save(user);

    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 }
    );
  }
}

export async function UPDATE(request: NextRequest) {
  try {
    const data = await request.json();
    const connection = await connectToDatabase();
    const userRepository = connection.getRepository(Users);
    const user = await userRepository.findOne(data.id);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    userRepository.merge(user, data);
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

// export async function DELETE(request: NextRequest) {
//   try {
//     const data = await request.json();
//     const connection = await connectToDatabase();
//     const userRepository = connection.getRepository(Users);
//     const user = await userRepository.findOne(data.id);
//     if (!user) {
//       return NextResponse.json({ error: "User not found" }, { status: 404 });
//     }
//     await userRepository.delete(data.id);
//     return NextResponse.json({ message: "User deleted" });
//   } catch (error) {
//     console.error("Error deleting user:", error);
//     return NextResponse.json(
//       { error: "Failed to delete user" },
//       { status: 500 }
//     );
//   }
// }