import { type NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET(request: NextRequest) {
  try {
    // Obtener estadísticas de contratos
    const [contratosPorExclusividad, contratosPorDepartamento, contratosPorCliente] = await Promise.all([
      prisma.contrato.groupBy({
        by: ["exclusividad"],
        _count: {
          id_contrato: true,
        },
      }),
      prisma.contrato.groupBy({
        by: ["departamento"],
        _count: {
          id_contrato: true,
        },
        orderBy: {
          _count: {
            id_contrato: "desc",
          },
        },
        take: 10,
      }),
      prisma.contacto.findMany({
        where: {
          contratos: {
            some: {},
          },
        },
        include: {
          _count: {
            select: {
              contratos: true,
            },
          },
        },
        orderBy: {
          contratos: {
            _count: "desc",
          },
        },
        take: 10,
      }),
    ])

    // Obtener contratos recientes
    const contratosRecientes = await prisma.contrato.findMany({
      take: 5,
      orderBy: {
        id_contrato: "desc",
      },
      include: {
        contacto: {
          select: {
            nombre: true,
          },
        },
        propiedad: {
          select: {
            titulo: true,
            direccion: true,
          },
        },
      },
    })

    return NextResponse.json({
      contratosPorExclusividad: contratosPorExclusividad.map((item) => ({
        name: item.exclusividad,
        value: item._count.id_contrato,
      })),
      contratosPorDepartamento: contratosPorDepartamento.map((item) => ({
        name: item.departamento,
        value: item._count.id_contrato,
      })),
      contratosPorCliente: contratosPorCliente.map((cliente) => ({
        id: cliente.id_contacto,
        nombre: cliente.nombre,
        cantidadContratos: cliente._count.contratos,
      })),
      contratosRecientes,
    })
  } catch (error) {
    console.error("Error al obtener estadísticas de contratos:", error)
    return NextResponse.json({ error: "Error al obtener estadísticas de contratos" }, { status: 500 })
  }
}
