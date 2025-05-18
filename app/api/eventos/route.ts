import { NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET(request: NextRequest) {
  try {
    const eventos = await prisma.eventos.findMany({
      orderBy: { fecha: "desc" },
    })
    return NextResponse.json(eventos)
  } catch (error) {
    console.error("Error al obtener eventos:", error)
    return NextResponse.json({ error: "Error al obtener eventos" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    // Asegúrate de recibir fecha y hora como string ISO o compatible
    const evento = await prisma.eventos.create({
      data: {
        titulo: data.titulo,
        tipo: data.tipo,
        fecha: new Date(data.fecha), // debe ser string tipo "2024-05-25"
        hora: new Date(`1970-01-01T${data.hora}:00Z`), // debe ser "HH:mm" o "HH:mm:ss"
        estado: data.estado,
      },
    })
    return NextResponse.json(evento)
  } catch (error) {
    console.error("Error al crear evento:", error)
    return NextResponse.json({ error: "Error al crear evento" }, { status: 500 })
  }
}