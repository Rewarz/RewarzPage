import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { prisma } from "@/app/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null);
    if (!body) {
      return NextResponse.json(
        { message: "Invalid request body" },
        { status: 400 }
      );
    }
    const { name, email, password } = body;
    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword, name, email);
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        description: "", // Initialize with an empty description
        image: null, // Initialize with no image
        isVerified: false, // User starts as unverified
      },
    });

    // Return success but don't include verification details in response
    return NextResponse.json(
      {
        message: "User created successfully. Please verify your email.",
        user: { id: user.id, name: user.name, email: user.email },
        requiresVerification: true,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
