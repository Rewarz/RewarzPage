import { authOptions } from './../../utils/authOptions';
import { NextResponse } from "next/server"
import { prisma } from '@/app/lib/prisma';
import { getServerSession } from "next-auth"

export async function POST(request: Request) {
  try {
    // Verify user is authenticated
    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
      return NextResponse.json({ message: "No autorizado" }, { status: 401 })
    }

    const { earnings } = await request.json()

    // Get today's date (server time to prevent manipulation)
    const today = new Date()
    // Usar solo la fecha sin la hora para ser consistente
    today.setHours(0, 0, 0, 0)

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email: session.user.email as string },
    })

    if (!user) {
      return NextResponse.json({ message: "Usuario no encontrado" }, { status: 404 })
    }

    // Find or create today's ad view record
    const adView = await prisma.adView.upsert({
      where: {
        userId_date: {
          userId: user.id,
          date: today,
        },
      },
      update: {
        count: { increment: 1 },
        earnings: { increment: earnings },
      },
      create: {
        userId: user.id,
        date: today,
        count: 1,
        earnings: earnings,
      },
    })

    // Devolver también la fecha utilizada para verificación
    return NextResponse.json({
      success: true,
      adView,
      serverDate: today.toISOString(),
    })
  } catch (error) {
    console.error("Error tracking ad view:", error)
    return NextResponse.json({ message: "Error al registrar visualización" }, { status: 500 })
  }
}

