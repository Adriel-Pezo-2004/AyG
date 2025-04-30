import { type NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id_propiedad = Number.parseInt(params.id)

    // Obtener todos los documentos de la propiedad
    const [cp, dni, hr, pu] = await Promise.all([
      prisma.cP.findMany({
        where: { id_propiedad },
        select: {
          id: true,
          nombre: true,
          tipo_archivo: true,
          fecha_subida: true,
        },
      }),
      prisma.dNI.findMany({
        where: { id_propiedad },
        select: {
          id: true,
          nombre: true,
          tipo_archivo: true,
          fecha_subida: true,
        },
      }),
      prisma.hR.findMany({
        where: { id_propiedad },
        select: {
          id: true,
          nombre: true,
          tipo_archivo: true,
          fecha_subida: true,
        },
      }),
      prisma.pU.findMany({
        where: { id_propiedad },
        select: {
          id: true,
          nombre: true,
          tipo_archivo: true,
          fecha_subida: true,
        },
      }),
    ])

    return NextResponse.json({
      cp: cp.map((doc) => ({ ...doc, tipo: "cp" })),
      dni: dni.map((doc) => ({ ...doc, tipo: "dni" })),
      hr: hr.map((doc) => ({ ...doc, tipo: "hr" })),
      pu: pu.map((doc) => ({ ...doc, tipo: "pu" })),
    })
  } catch (error) {
    console.error("Error al obtener documentos de la propiedad:", error)
    return NextResponse.json({ error: "Error al obtener documentos de la propiedad" }, { status: 500 })
  }
}
