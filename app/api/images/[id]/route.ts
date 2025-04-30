import { type NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)
    const image = await prisma.images.findUnique({
      where: { id_imagen: id },
    })

    if (!image) {
      return NextResponse.json({ error: "Imagen no encontrada" }, { status: 404 })
    }

    // Devolver la imagen como un blob
    return new NextResponse(image.image_data, {
      headers: {
        "Content-Type": "image/jpeg",
        "Content-Disposition": `inline; filename="image-${id}.jpg"`,
      },
    })
  } catch (error) {
    console.error("Error al obtener imagen:", error)
    return NextResponse.json({ error: "Error al obtener imagen" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)

    await prisma.images.delete({
      where: { id_imagen: id },
    })

    return NextResponse.json({ message: "Imagen eliminada correctamente" })
  } catch (error) {
    console.error("Error al eliminar imagen:", error)
    return NextResponse.json({ error: "Error al eliminar imagen" }, { status: 500 })
  }
}
