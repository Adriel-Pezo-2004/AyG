import { type NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import bcrypt from "bcrypt"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)
    const usuario = await prisma.usuarios.findUnique({
      where: { user_id: id },
      select: {
        user_id: true,
        usuario: true,
        nombres: true,
        apellidos: true,
        tipo_documento: true,
        numero_documento: true,
        ruc: true,
        genero: true,
        celular: true,
        departamento: true,
        provincia: true,
        distrito: true,
      },
    })

    if (!usuario) {
      return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 })
    }

    return NextResponse.json(usuario)
  } catch (error) {
    console.error("Error al obtener usuario:", error)
    return NextResponse.json({ error: "Error al obtener usuario" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)
    const formData = await request.formData()

    const updateData: any = {}

    // Actualizar solo los campos proporcionados
    if (formData.has("nombres")) updateData.nombres = formData.get("nombres")
    if (formData.has("apellidos")) updateData.apellidos = formData.get("apellidos")
    if (formData.has("tipo_documento")) updateData.tipo_documento = formData.get("tipo_documento")
    if (formData.has("numero_documento")) updateData.numero_documento = formData.get("numero_documento")
    if (formData.has("ruc")) updateData.ruc = formData.get("ruc")
    if (formData.has("genero")) updateData.genero = formData.get("genero")
    if (formData.has("celular")) updateData.celular = formData.get("celular")
    if (formData.has("departamento")) updateData.departamento = formData.get("departamento")
    if (formData.has("provincia")) updateData.provincia = formData.get("provincia")
    if (formData.has("distrito")) updateData.distrito = formData.get("distrito")

    // Si se proporciona una nueva imagen
    const imagenFile = formData.get("imagen") as File
    if (imagenFile) {
      const bytes = await imagenFile.arrayBuffer()
      updateData.imagen = Buffer.from(bytes)
    }

    const usuario = await prisma.usuarios.update({
      where: { user_id: id },
      data: updateData,
    })

    // No devolver la contraseña en la respuesta
    const { contraseña: _, ...usuarioSinContraseña } = usuario

    return NextResponse.json(usuarioSinContraseña)
  } catch (error) {
    console.error("Error al actualizar usuario:", error)
    return NextResponse.json({ error: "Error al actualizar usuario" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)

    await prisma.usuarios.delete({
      where: { user_id: id },
    })

    return NextResponse.json({ message: "Usuario eliminado correctamente" })
  } catch (error) {
    console.error("Error al eliminar usuario:", error)
    return NextResponse.json({ error: "Error al eliminar usuario" }, { status: 500 })
  }
}