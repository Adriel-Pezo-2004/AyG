import { type NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET(request: NextRequest, { params }: { params: { tipo: string; id: string } }) {
  try {
    const { tipo, id } = params
    const documentId = Number.parseInt(id)

    let documento

    switch (tipo.toLowerCase()) {
      case "cp":
        documento = await prisma.cP.findUnique({
          where: { id: documentId },
        })
        break
      case "dni":
        documento = await prisma.dNI.findUnique({
          where: { id: documentId },
        })
        break
      case "hr":
        documento = await prisma.hR.findUnique({
          where: { id: documentId },
        })
        break
      case "pu":
        documento = await prisma.pU.findUnique({
          where: { id: documentId },
        })
        break
      default:
        return NextResponse.json({ error: "Tipo de documento no válido" }, { status: 400 })
    }

    if (!documento) {
      return NextResponse.json({ error: "Documento no encontrado" }, { status: 404 })
    }

    // Determinar el tipo MIME
    const contentType = documento.tipo_archivo || "application/octet-stream"

    // Devolver el documento como un blob
    return new NextResponse(documento.archivo, {
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": `inline; filename="${documento.nombre}"`,
      },
    })
  } catch (error) {
    console.error("Error al obtener documento:", error)
    return NextResponse.json({ error: "Error al obtener documento" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { tipo: string; id: string } }) {
  try {
    const { tipo, id } = params
    const documentId = Number.parseInt(id)

    switch (tipo.toLowerCase()) {
      case "cp":
        await prisma.cP.delete({
          where: { id: documentId },
        })
        break
      case "dni":
        await prisma.dNI.delete({
          where: { id: documentId },
        })
        break
      case "hr":
        await prisma.hR.delete({
          where: { id: documentId },
        })
        break
      case "pu":
        await prisma.pU.delete({
          where: { id: documentId },
        })
        break
      default:
        return NextResponse.json({ error: "Tipo de documento no válido" }, { status: 400 })
    }

    return NextResponse.json({ message: "Documento eliminado correctamente" })
  } catch (error) {
    console.error("Error al eliminar documento:", error)
    return NextResponse.json({ error: "Error al eliminar documento" }, { status: 500 })
  }
}
