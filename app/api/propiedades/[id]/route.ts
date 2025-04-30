import { type NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)
    const propiedad = await prisma.propiedades.findUnique({
      where: { id_propiedad: id },
      include: {
        contacto: true,
        imagenes: true,
        contratos: true,
        cp: true,
        dni: true,
        hr: true,
        pu: true,
      },
    })

    if (!propiedad) {
      return NextResponse.json({ error: "Propiedad no encontrada" }, { status: 404 })
    }

    return NextResponse.json(propiedad)
  } catch (error) {
    console.error("Error al obtener propiedad:", error)
    return NextResponse.json({ error: "Error al obtener propiedad" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)
    const formData = await request.formData()

    const propiedadData = {
      titulo: formData.get("titulo") as string,
      descripcion: formData.get("descripcion") as string,
      tipo_pro: formData.get("tipo_pro") as string,
      subtipo: formData.get("subtipo") as string,
      antiguedad: parseInt(formData.get("antiguedad") as string),
      area_terreno: parseFloat(formData.get("area_terreno") as string),
      area_construida: parseFloat(formData.get("area_construida") as string),
      tipo_negocio: formData.get("tipo_negocio") as string,
      precio: parseFloat(formData.get("precio") as string),
      departamento: formData.get("departamento") as string,
      provincia: formData.get("provincia") as string,
      distrito: formData.get("distrito") as string,
      urbanizacion: formData.get("urbanizacion") as string,
      direccion: formData.get("direccion") as string,
      pisos: parseInt(formData.get("pisos") as string),
      dormitorios: parseInt(formData.get("dormitorios") as string),
      baños: parseInt(formData.get("baños") as string),
      cocheras: parseInt(formData.get("cocheras") as string),
      mantenimiento: parseInt(formData.get("mantenimiento") as string),
      cocinas: parseInt(formData.get("cocinas") as string),
      medbaños: parseInt(formData.get("medbaños") as string),
      ascensor: formData.get("ascensor") as string,
      terrazas: parseInt(formData.get("terrazas") as string),
      estado: formData.get("estado") as string,
      usuario_insertor: formData.get("usuario_insertor") as string,
    }

    const propiedad = await prisma.propiedades.update({
      where: { id_propiedad: id },
      data: propiedadData,
    })

    return NextResponse.json(propiedad)
  } catch (error) {
    console.error("Error al actualizar propiedad:", error)
    return NextResponse.json({ error: "Error al actualizar propiedad" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)

    await prisma.$transaction([
      prisma.images.deleteMany({ where: { id_propiedad: id } }),
      prisma.cp.deleteMany({ where: { id_propiedad: id } }),
      prisma.dni.deleteMany({ where: { id_propiedad: id } }),
      prisma.hr.deleteMany({ where: { id_propiedad: id } }),
      prisma.pu.deleteMany({ where: { id_propiedad: id } }),
      prisma.propiedades.delete({ where: { id_propiedad: id } }),
    ])

    return NextResponse.json({ message: "Propiedad eliminada correctamente" })
  } catch (error) {
    console.error("Error al eliminar propiedad:", error)
    return NextResponse.json({ error: "Error al eliminar propiedad" }, { status: 500 })
  }
}