import { NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function POST(request: NextRequest) {
  const { usuario, password } = await request.json()

  const asesor = await prisma.usuarios.findFirst({
    where: { usuario },
  })

  if (!asesor || asesor.contraseña !== password) {
    return NextResponse.json({ error: "Credenciales inválidas" }, { status: 401 })
  }

  const response = NextResponse.json({ success: true })
  response.cookies.set(
    "user_id",
    String(asesor.user_id),
    {
      httpOnly: true,
      path: "/",
      sameSite: "lax",
      maxAge: 60 * 60 * 24,
    }
  )

  return response
}