import { type NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET(request: NextRequest) {
  try {
    // Obtener estadísticas generales
    const [
      totalPropiedades,
      totalContactos,
      totalContratos,
      propiedadesPorTipo,
      propiedadesPorEstado,
      propiedadesPorDistrito,
    ] = await Promise.all([
      prisma.propiedades.count(),
      prisma.contacto.count(),
      prisma.contrato.count(),
      prisma.propiedades.groupBy({
        by: ["tipo_pro"],
        _count: {
          id_propiedad: true,
        },
      }),
      prisma.propiedades.groupBy({
        by: ["estado"],
        _count: {
          id_propiedad: true,
        },
      }),
      prisma.propiedades.groupBy({
        by: ["distrito"],
        _count: {
          id_propiedad: true,
        },
        orderBy: {
          _count: {
            id_propiedad: "desc",
          },
        },
        take: 8,
      }),
    ])

    // Obtener propiedades recientes
    const propiedadesRecientes = await prisma.propiedades.findMany({
      take: 5,
      orderBy: {
        fecha_creacion: "desc",
      },
      include: {
        contacto: {
          select: {
            nombre: true,
          },
        },
      },
    })

    return NextResponse.json({
      totalPropiedades,
      totalContactos,
      totalContratos,
      propiedadesPorTipo: propiedadesPorTipo.map((item) => ({
        name: item.tipo_pro,
        value: item._count.id_propiedad,
      })),
      propiedadesPorEstado: propiedadesPorEstado.map((item) => ({
        name: item.estado,
        value: item._count.id_propiedad,
      })),
      propiedadesPorDistrito: propiedadesPorDistrito.map((item) => ({
        name: item.distrito,
        value: item._count.id_propiedad,
      })),
      propiedadesRecientes,
    })
  } catch (error) {
    console.error("Error al obtener estadísticas del dashboard:", error)
    return NextResponse.json({ error: "Error al obtener estadísticas del dashboard" }, { status: 500 })
  }
}
