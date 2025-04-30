import { type NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET(request: NextRequest) {
  try {
    const propiedades = await prisma.propiedades.findMany({
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
    return NextResponse.json(propiedades)
  } catch (error) {
    console.error("Error al obtener propiedades:", error)
    return NextResponse.json({ error: "Error al obtener propiedades" }, { status: 500 })
  }
}
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()

    // Crear la propiedad
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

    const propiedad = await prisma.propiedades.create({
      data: propiedadData,
    })

    // Subir imágenes
    const images = formData.getAll("imagenes") as File[]
    for (const image of images) {
      const bytes = await image.arrayBuffer()
      await prisma.images.create({
        data: {
          id_propiedad: propiedad.id_propiedad,
          image_data: Buffer.from(bytes),
        },
      })
    }

    // Subir documentos
    const documentos = ["cp", "dni", "hr", "pu"]
    for (const doc of documentos) {
      const files = formData.getAll(doc) as File[]
      for (const file of files) {
        const bytes = await file.arrayBuffer()
        await prisma[doc].create({
          data: {
            id_propiedad: propiedad.id_propiedad,
            nombre: file.name,
            archivo: Buffer.from(bytes),
            tipo_archivo: file.type,
          },
        })
      }
    }

    return NextResponse.json(propiedad, { status: 201 })
  } catch (error) {
    console.error("Error al crear propiedad:", error)
    return NextResponse.json({ error: "Error al crear propiedad" }, { status: 500 })
  }
}
