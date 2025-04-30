import { type NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const tipo = formData.get("tipo") as string
    const id_propiedad = Number.parseInt(formData.get("id_propiedad") as string)
    const nombre = formData.get("nombre") as string
    const archivo = formData.get("archivo") as File
    const tipo_archivo = archivo.type

    if (!archivo) {
      return NextResponse.json({ error: "No se proporcionó ningún archivo" }, { status: 400 })
    }

    const bytes = await archivo.arrayBuffer()
    const buffer = Buffer.from(bytes)

    let documento

    switch (tipo.toLowerCase()) {
      case "cp":
        documento = await prisma.cP.create({
          data: {
            id_propiedad,
            nombre,
            archivo: buffer,
            tipo_archivo,
          },
        })
        break
      case "dni":
        documento = await prisma.dNI.create({
          data: {
            id_propiedad,
            nombre,
            archivo: buffer,
            tipo_archivo,
          },
        })
        break
      case "hr":
        documento = await prisma.hR.create({
          data: {
            id_propiedad,
            nombre,
            archivo: buffer,
            tipo_archivo,
          },
        })
        break
      case "pu":
        documento = await prisma.pU.create({
          data: {
            id_propiedad,
            nombre,
            archivo: buffer,
            tipo_archivo,
          },
        })
        break
      default:
        return NextResponse.json({ error: "Tipo de documento no válido" }, { status: 400 })
    }

    return NextResponse.json(
      {
        id: documento.id,
        nombre: documento.nombre,
        tipo_archivo: documento.tipo_archivo,
        fecha_subida: documento.fecha_subida,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error al subir documento:", error)
    return NextResponse.json({ error: "Error al subir documento" }, { status: 500 })
  }
}
