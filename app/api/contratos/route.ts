import { type NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET(request: NextRequest) {
  try {
    const contratos = await prisma.contrato.findMany({
      include: {
        contacto: true,
        propiedad: true,
      },
    })
    return NextResponse.json(contratos)
  } catch (error) {
    console.error("Error al obtener contratos:", error)
    return NextResponse.json({ error: "Error al obtener contratos" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const contrato = await prisma.contrato.create({
      data: {
        id_contacto: data.id_contacto,
        id_propiedad: data.id_propiedad,
        departamento: data.departamento,
        provincia: data.provincia,
        distrito: data.distrito,
        direccion: data.direccion,
        exclusividad: data.exclusividad,
        usuario_insertor: data.usuario_insertor,
      },
    })
    return NextResponse.json(contrato, { status: 201 })
  } catch (error) {
    console.error("Error al crear contrato:", error)
    return NextResponse.json({ error: "Error al crear contrato" }, { status: 500 })
  }
}
