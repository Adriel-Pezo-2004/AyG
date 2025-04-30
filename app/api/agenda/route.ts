import { type NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET(request: NextRequest) {
  try {
    const agenda = await prisma.agenda.findMany()
    return NextResponse.json(agenda)
  } catch (error) {
    console.error("Error al obtener agenda:", error)
    return NextResponse.json({ error: "Error al obtener agenda" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const tarea = formData.get("tarea") as string
    const fecha = new Date(formData.get("fecha") as string)
    const hora = new Date(`1970-01-01T${formData.get("hora")}:00`)
    const imagenFile = formData.get("imagen") as File

    let imagen: Buffer | null = null
    if (imagenFile) {
      const bytes = await imagenFile.arrayBuffer()
      imagen = Buffer.from(bytes)
    }

    const agendaItem = await prisma.agenda.create({
      data: {
        tarea,
        fecha,
        hora,
        imagen: imagen || Buffer.from([]),
      },
    })

    return NextResponse.json(agendaItem, { status: 201 })
  } catch (error) {
    console.error("Error al crear agenda:", error)
    return NextResponse.json({ error: "Error al crear agenda" }, { status: 500 })
  }
}
