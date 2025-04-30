import { type NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)
    const contrato = await prisma.contrato.findUnique({
      where: { id_contrato: id },
      include: {
        contacto: true,
        propiedad: true,
      },
    })

    if (!contrato) {
      return NextResponse.json({ error: "Contrato no encontrado" }, { status: 404 })
    }

    return NextResponse.json(contrato)
  } catch (error) {
    console.error("Error al obtener contrato:", error)
    return NextResponse.json({ error: "Error al obtener contrato" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)
    const data = await request.json()

    const contrato = await prisma.contrato.update({
      where: { id_contrato: id },
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

    return NextResponse.json(contrato)
  } catch (error) {
    console.error("Error al actualizar contrato:", error)
    return NextResponse.json({ error: "Error al actualizar contrato" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)

    await prisma.contrato.delete({
      where: { id_contrato: id },
    })

    return NextResponse.json({ message: "Contrato eliminado correctamente" })
  } catch (error) {
    console.error("Error al eliminar contrato:", error)
    return NextResponse.json({ error: "Error al eliminar contrato" }, { status: 500 })
  }
}
