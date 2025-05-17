import { type NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET(request: NextRequest) {
  try {
    const contactos = await prisma.contacto.findMany({
      include: {
        propiedades: true,
        contratos: true,
      },
    })
    return NextResponse.json(contactos)
  } catch (error) {
    console.error("Error al obtener contactos:", error)
    return NextResponse.json({ error: "Error al obtener contactos" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const user_id = request.cookies.get("user_id")?.value || null
    if (!user_id) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 })
    }

    const contacto = await prisma.contacto.create({
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
        usuario_insertor: user_id,
      },
    })
    return NextResponse.json(contacto, { status: 201 })
  } catch (error) {
    console.error("Error al crear contacto:", error)
    return NextResponse.json({ error: "Error al crear contacto" }, { status: 500 })
  }
}
