import { type NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id_propiedad = Number.parseInt(params.id)

    const imagenes = await prisma.images.findMany({
      where: { id_propiedad },
    })

    return NextResponse.json(imagenes)
  } catch (error) {
    console.error("Error al obtener imágenes de la propiedad:", error)
    return NextResponse.json({ error: "Error al obtener imágenes de la propiedad" }, { status: 500 })
  }
}

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id_propiedad = Number.parseInt(params.id)
    const formData = await request.formData()
    const imageFile = formData.get("image") as File

    if (!imageFile) {
      return NextResponse.json({ error: "No se proporcionó ninguna imagen" }, { status: 400 })
    }

    const bytes = await imageFile.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const image = await prisma.images.create({
      data: {
        id_propiedad,
        image_data: buffer,
      },
    })

    return NextResponse.json(image, { status: 201 })
  } catch (error) {
    console.error("Error al subir imagen:", error)
    return NextResponse.json({ error: "Error al subir imagen" }, { status: 500 })
  }
}
