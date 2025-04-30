import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET() {
  try {
    // Intentar una consulta simple para verificar la conexión
    await prisma.$queryRaw`SELECT 1`

    return NextResponse.json({
      status: "success",
      message: "Conexión a la base de datos establecida correctamente",
      database: process.env.DATABASE_URL?.split("@")[1]?.split("/")[1] || "ayg",
    })
  } catch (error) {
    console.error("Error al conectar con la base de datos:", error)
    return NextResponse.json(
      {
        status: "error",
        message: "Error al conectar con la base de datos",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}
