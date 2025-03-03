import { NextResponse } from "next/server"
import bcrypt from "bcrypt"
import { prisma } from "@/app/lib/prisma"

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null)
    if (!body) {
      return NextResponse.json({ message: "Invalid request body" }, { status: 400 })
    }
    const { email, password } = body
    if (!email || !password) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 })
    }

    // Find user in database
    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 })
    }

    // Compare password
    const isPasswordCorrect = await bcrypt.compare(password, user.password)
    if (!isPasswordCorrect) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 })
    }

    // Return success but indicate verification is needed
    return NextResponse.json(
      {
        message: "Credentials verified. Email verification required.",
        user: { id: user.id, name: user.name, email: user.email },
        requiresVerification: true,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 })
  }
}

