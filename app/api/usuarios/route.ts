import { type NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET(request: NextRequest) {
  try {
    // Obtener todos los asesores con sus imágenes (si existen)
    const asesores = await prisma.usuarios.findMany({
      select: {
        user_id: true,
        nombres: true,
        apellidos: true,
        usuario: true,
        celular: true,
        departamento: true,
        provincia: true,
        distrito: true,
        imagen: true, // ← Añadimos este campo
      },
    })

    // Convertir imágenes binarias a base64 (si existen)
    const asesoresConImagen = asesores.map(asesor => {
      if (asesor.imagen) {
        return {
          ...asesor,
          imagen: `data:image/jpeg;base64,${Buffer.from(asesor.imagen).toString('base64')}`
        }
      }
      return asesor
    })

    return NextResponse.json(asesoresConImagen, { status: 200 })

  } catch (error) {
    console.error("Error al obtener asesores:", error)
  } finally {
    await prisma.$disconnect()
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const usuario = formData.get("usuario") as string
    const contraseña = formData.get("contraseña") as string
    const nombres = formData.get("nombres") as string
    const apellidos = formData.get("apellidos") as string
    const tipo_documento = formData.get("tipo_documento") as string
    const numero_documento = formData.get("numero_documento") as string
    const ruc = formData.get("ruc") as string
    const genero = formData.get("genero") as string
    const celular = formData.get("celular") as string
    const departamento = formData.get("departamento") as string
    const provincia = formData.get("provincia") as string
    const distrito = formData.get("distrito") as string
    const imagenFile = formData.get("imagen") as File

    // Verificar si el usuario ya existe
    const usuarioExistente = await prisma.usuarios.findFirst({
      where: { usuario },
    })

    if (usuarioExistente) {
      return NextResponse.json({ error: "El nombre de usuario ya está en uso" }, { status: 400 })
    }

 
    let imagen: Buffer | null = null
    if (imagenFile) {
      const bytes = await imagenFile.arrayBuffer()
      imagen = Buffer.from(bytes)
    }

    const nuevoUsuario = await prisma.usuarios.create({
      data: {
        usuario,
        contraseña,
        nombres,
        apellidos,
        tipo_documento,
        numero_documento,
        ruc,
        genero,
        celular,
        departamento,
        provincia,
        distrito,
        imagen: imagen || null,
      },
    })

    return NextResponse.json(nuevoUsuario, { status: 201 })
  } catch (error) {
    console.error("Error al crear usuario:", error)
    return NextResponse.json({ error: "Error al crear usuario" }, { status: 500 })
  }
}