import { type NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET(request: NextRequest) {
  try {
    // Obtener estadísticas de clientes
    const [clientesPorGenero, clientesPorDepartamento, clientesConPropiedades, clientesConContratos] =
      await Promise.all([
        prisma.contacto.groupBy({
          by: ["genero"],
          _count: {
            id_contacto: true,
          },
        }),
        prisma.contacto.groupBy({
          by: ["departamento"],
          _count: {
            id_contacto: true,
          },
          orderBy: {
            _count: {
              id_contacto: "desc",
            },
          },
          take: 10,
        }),
        prisma.contacto.findMany({
          where: {
            propiedades: {
              some: {},
            },
          },
          include: {
            _count: {
              select: {
                propiedades: true,
              },
            },
          },
          orderBy: {
            propiedades: {
              _count: "desc",
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

    return NextResponse.json({
      clientesPorGenero: clientesPorGenero.map((item) => ({
        name: item.genero === "M" ? "Masculino" : item.genero === "F" ? "Femenino" : "Otro",
        value: item._count.id_contacto,
      })),
      clientesPorDepartamento: clientesPorDepartamento.map((item) => ({
        name: item.departamento,
        value: item._count.id_contacto,
      })),
      clientesConPropiedades: clientesConPropiedades.map((cliente) => ({
        id: cliente.id_contacto,
        nombre: cliente.nombre,
        cantidadPropiedades: cliente._count.propiedades,
      })),
      clientesConContratos: clientesConContratos.map((cliente) => ({
        id: cliente.id_contacto,
        nombre: cliente.nombre,
        cantidadContratos: cliente._count.contratos,
      })),
    })
  } catch (error) {
    console.error("Error al obtener estadísticas de clientes:", error)
    return NextResponse.json({ error: "Error al obtener estadísticas de clientes" }, { status: 500 })
  }
}
