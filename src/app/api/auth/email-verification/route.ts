import { NextResponse } from "next/server"
import { prisma } from "@/app/lib/prisma"
import nodemailer from "nodemailer"

// Configure email transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
})

// Generate a random 6-digit code
function generateVerificationCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString()
}
// Send verification email
async function sendVerificationEmail(email: string, code: string, isLogin: boolean): Promise<boolean> {
  try {
    const subject = isLogin ? "Login Verification Code" : "Account Verification Code"

    const text = isLogin
      ? `Your login verification code is: ${code}. This code will expire in 10 minutes.`
      : `Your account verification code is: ${code}. This code will expire in 10 minutes.`

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject,
      text,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
          <h2 style="color: #4f46e5;">${subject}</h2>
          <p>Your verification code is:</p>
          <div style="background-color: #f3f4f6; padding: 10px; border-radius: 4px; font-size: 24px; text-align: center; letter-spacing: 5px; font-weight: bold;">
            ${code}
          </div>
          <p style="margin-top: 20px;">This code will expire in 10 minutes.</p>
          <p style="color: #6b7280; font-size: 14px; margin-top: 30px;">If you didn't request this code, please ignore this email.</p>
        </div>
      `,
    })
    return true
  } catch (error) {
    console.error("Error sending email:", error)
    return false
  }
}

// API route to send verification code
export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null)
    if (!body) {
      return NextResponse.json({ message: "Invalid request body" }, { status: 400 })
    }

    const { email, isLogin = false } = body
    if (!email) {
      return NextResponse.json({ message: "Email is required" }, { status: 400 })
    }

    // Generate verification code
    const verificationCode = generateVerificationCode()
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000) // 10 minutes from now

    // Store verification code in database
    await prisma.user.update({
      where: { email },
      data: {
        verificationCode,
        verificationCodeExpires: expiresAt,
      },
    })

    // Send verification email
    const emailSent = await sendVerificationEmail(email, verificationCode, isLogin)
    if (!emailSent) {
      return NextResponse.json({ message: "Failed to send verification email" }, { status: 500 })
    }

    return NextResponse.json({ message: "Verification code sent successfully" }, { status: 200 })
  } catch (error) {
    console.error("Verification code error:", error)
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 })
  }
}

