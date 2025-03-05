import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Obtener la fecha actual del servidor
    const serverDate = new Date()

    // Retornar la fecha en formato ISO para mayor precisión
    return NextResponse.json({
      timestamp: serverDate.toISOString(),
      success: true,
      // Incluir información adicional para depuración
      date: serverDate.toDateString(),
      time: serverDate.toTimeString(),
    })
  } catch (error) {
    console.error("Error getting server time:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Error al obtener la hora del servidor",
      },
      { status: 500 },
    )
  }
}

