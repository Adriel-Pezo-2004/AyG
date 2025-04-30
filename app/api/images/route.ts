import { type NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET(request: NextRequest) {
  try {
    const images = await prisma.images.findMany()
    return NextResponse.json(images)
  } catch (error) {
    console.error("Error al obtener imágenes:", error)
    return NextResponse.json({ error: "Error al obtener imágenes" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const id_propiedad = Number.parseInt(formData.get("id_propiedad") as string)
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
