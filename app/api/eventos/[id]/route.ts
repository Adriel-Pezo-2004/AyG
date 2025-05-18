import { NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"

// Obtener un evento por ID
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // ¡Debemos esperar a que los params estén disponibles!
    const { id: idParam } = await params;
    const id = Number(idParam)
    if (isNaN(id)) return NextResponse.json({ error: "ID inválido" }, { status: 400 })

    const evento = await prisma.eventos.findUnique({
      where: { id_evento: id },
    })

    if (!evento) {
      return NextResponse.json({ error: "Evento no encontrado" }, { status: 404 })
    }

    // Formatear la respuesta para el frontend
    const response = {
      titulo: evento.titulo,
      tipo: evento.tipo,
      fecha: evento.fecha.toISOString(),
      hora: evento.hora.toISOString().split('T')[1].substring(0, 5),
      estado: evento.estado,
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error("Error al obtener evento:", error)
    return NextResponse.json({ error: "Error al obtener evento" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // ¡También debemos esperar los params aquí!
    const { id: idParam } = await params;
    const id = Number(idParam)
    if (isNaN(id)) return NextResponse.json({ error: "ID inválido" }, { status: 400 })

    const data = await request.json()

    // Validar datos
    if (!data.titulo || !data.tipo || !data.fecha || !data.hora || !data.estado) {
      return NextResponse.json({ error: "Faltan campos requeridos" }, { status: 400 })
    }

    // Crear objeto Date combinando fecha y hora
    const fechaHora = new Date(`${data.fecha}T${data.hora}:00`)

    const evento = await prisma.eventos.update({
      where: { id_evento: id },
      data: {
        titulo: data.titulo,
        tipo: data.tipo,
        fecha: new Date(data.fecha),
        hora: fechaHora,
        estado: data.estado,
      },
    })

    return NextResponse.json({
      success: true,
      evento: {
        id: evento.id_evento,
        titulo: evento.titulo,
        tipo: evento.tipo,
        fecha: evento.fecha.toISOString(),
        hora: evento.hora.toISOString().split('T')[1].substring(0, 5),
        estado: evento.estado,
      }
    })
  } catch (error) {
    console.error("Error al actualizar evento:", error)
    return NextResponse.json({ error: "Error al actualizar evento" }, { status: 500 })
  }
}