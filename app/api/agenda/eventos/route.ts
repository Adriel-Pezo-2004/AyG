import { type NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET(request: NextRequest) {
  try {
    // Obtener todos los eventos de la agenda
    const eventos = await prisma.agenda.findMany({
      orderBy: {
        fecha: "asc",
      },
    })

    // Formatear los eventos para el calendario
    const eventosFormateados = eventos.map((evento) => {
      // Combinar fecha y hora para crear un objeto Date completo
      const fechaEvento = new Date(evento.fecha)
      const horaEvento = new Date(evento.hora)

      fechaEvento.setHours(horaEvento.getHours(), horaEvento.getMinutes(), horaEvento.getSeconds())

      // Crear fecha de fin (1 hora después por defecto)
      const fechaFin = new Date(fechaEvento)
      fechaFin.setHours(fechaFin.getHours() + 1)

      return {
        id: evento.id_agenda,
        title: evento.tarea,
        start: fechaEvento,
        end: fechaFin,
        allDay: false,
      }
    })

    return NextResponse.json(eventosFormateados)
  } catch (error) {
    console.error("Error al obtener eventos de agenda:", error)
    return NextResponse.json({ error: "Error al obtener eventos de agenda" }, { status: 500 })
  }
}
