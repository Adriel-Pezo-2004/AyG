import { type NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET(request: NextRequest) {
  try {
    // Obtener estadísticas de propiedades
    const [propiedadesPorTipo, propiedadesPorEstado, propiedadesPorDistrito, propiedadesPorPrecio] = await Promise.all([
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
        take: 10,
      }),
      prisma.$queryRaw`
        SELECT 
          CASE 
            WHEN precio < 100000 THEN 'Menos de 100,000'
            WHEN precio BETWEEN 100000 AND 200000 THEN '100,000 - 200,000'
            WHEN precio BETWEEN 200001 AND 300000 THEN '200,001 - 300,000'
            WHEN precio BETWEEN 300001 AND 400000 THEN '300,001 - 400,000'
            WHEN precio BETWEEN 400001 AND 500000 THEN '400,001 - 500,000'
            ELSE 'Más de 500,000'
          END AS rango_precio,
          COUNT(*) AS cantidad
        FROM propiedades
        GROUP BY rango_precio
        ORDER BY MIN(precio)
      `,
    ])

    return NextResponse.json({
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
      propiedadesPorPrecio,
    })
  } catch (error) {
    console.error("Error al obtener estadísticas de propiedades:", error)
    return NextResponse.json({ error: "Error al obtener estadísticas de propiedades" }, { status: 500 })
  }
}
