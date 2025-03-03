import { NextResponse } from "next/server"
import { prisma } from "@/app/lib/prisma"

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null)
    if (!body) {
      return NextResponse.json({ message: "Invalid request body" }, { status: 400 })
    }

    const { email, code } = body
    if (!email || !code) {
      return NextResponse.json({ message: "Email and verification code are required" }, { status: 400 })
    }

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email },
    })

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 })
    }

    // Check if verification code is valid and not expired
    if (user.verificationCode !== code || !user.verificationCodeExpires || new Date() > user.verificationCodeExpires) {
      return NextResponse.json({ message: "Invalid or expired verification code" }, { status: 400 })
    }

    // Update user verification status
    await prisma.user.update({
      where: { email },
      data: {
        isVerified: true,
        verificationCode: null,
        verificationCodeExpires: null,
      },
    })

    return NextResponse.json({ message: "Verification successful", verified: true }, { status: 200 })
  } catch (error) {
    console.error("Verification error:", error)
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 })
  }
}

