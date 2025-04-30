import { type NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)
    const contacto = await prisma.contacto.findUnique({
      where: { id_contacto: id },
      include: {
        propiedades: true,
        contratos: true,
      },
    })

    if (!contacto) {
      return NextResponse.json({ error: "Contacto no encontrado" }, { status: 404 })
    }

    return NextResponse.json(contacto)
  } catch (error) {
    console.error("Error al obtener contacto:", error)
    return NextResponse.json({ error: "Error al obtener contacto" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)
    const data = await request.json()

    const contacto = await prisma.contacto.update({
      where: { id_contacto: id },
      data: {
        nombre: data.nombre,
        genero: data.genero,
        celular: data.celular,
        documento: data.documento,
        nrodocumento: data.nrodocumento,
        correo: data.correo,
        departamento: data.departamento,
        provincia: data.provincia,
        distrito: data.distrito,
        urbanizacion: data.urbanizacion,
        direccion: data.direccion,
        usuario_insertor: data.usuario_insertor,
      },
    })

    return NextResponse.json(contacto)
  } catch (error) {
    console.error("Error al actualizar contacto:", error)
    return NextResponse.json({ error: "Error al actualizar contacto" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)

    // Verificar si hay propiedades o contratos relacionados
    const contacto = await prisma.contacto.findUnique({
      where: { id_contacto: id },
      include: {
        propiedades: true,
        contratos: true,
      },
    })

    if (!contacto) {
      return NextResponse.json({ error: "Contacto no encontrado" }, { status: 404 })
    }

    if (contacto.propiedades.length > 0 || contacto.contratos.length > 0) {
      return NextResponse.json(
        { error: "No se puede eliminar el contacto porque tiene propiedades o contratos asociados" },
        { status: 400 },
      )
    }

    await prisma.contacto.delete({
      where: { id_contacto: id },
    })

    return NextResponse.json({ message: "Contacto eliminado correctamente" })
  } catch (error) {
    console.error("Error al eliminar contacto:", error)
    return NextResponse.json({ error: "Error al eliminar contacto" }, { status: 500 })
  }
}
