import { type NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)
    const agendaItem = await prisma.agenda.findUnique({
      where: { id_agenda: id },
    })

    if (!agendaItem) {
      return NextResponse.json({ error: "Agenda no encontrada" }, { status: 404 })
    }

    return NextResponse.json(agendaItem)
  } catch (error) {
    console.error("Error al obtener agenda:", error)
    return NextResponse.json({ error: "Error al obtener agenda" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)
    const formData = await request.formData()
    const tarea = formData.get("tarea") as string
    const fecha = new Date(formData.get("fecha") as string)
    const hora = new Date(`1970-01-01T${formData.get("hora")}:00`)
    const imagenFile = formData.get("imagen") as File

    const updateData: any = {
      tarea,
      fecha,
      hora,
    }

    if (imagenFile) {
      const bytes = await imagenFile.arrayBuffer()
      updateData.imagen = Buffer.from(bytes)
    }

    const agendaItem = await prisma.agenda.update({
      where: { id_agenda: id },
      data: updateData,
    })

    return NextResponse.json(agendaItem)
  } catch (error) {
    console.error("Error al actualizar agenda:", error)
    return NextResponse.json({ error: "Error al actualizar agenda" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)

    await prisma.agenda.delete({
      where: { id_agenda: id },
    })

    return NextResponse.json({ message: "Agenda eliminada correctamente" })
  } catch (error) {
    console.error("Error al eliminar agenda:", error)
    return NextResponse.json({ error: "Error al eliminar agenda" }, { status: 500 })
  }
}
