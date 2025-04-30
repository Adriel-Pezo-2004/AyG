"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Building, Search, Pencil, Trash2, FileDown } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export default function PropiedadesPage() {
  interface Propiedad {
    id_propiedad: string
    direccion: string
    tipo: string
    asesor: string
    fechaCaptacion: string
    estado: string
  }

  const [propiedades, setPropiedades] = useState<Propiedad[]>([])

  useEffect(() => {
    const fetchPropiedades = async () => {
      try {
        const res = await fetch("/api/propiedades")
        if (!res.ok) throw new Error("Error al cargar propiedades")
        const data = await res.json()
        setPropiedades(data)
      } catch (error) {
        console.error("Error al obtener propiedades:", error)
      }
    }

    fetchPropiedades()
  }, [])

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm("¿Estás seguro de eliminar esta propiedad?")
    if (!confirmDelete) return

    try {
      const res = await fetch(`/api/propiedades/${id}`, {
        method: "DELETE",
      })

      if (res.ok) {
        setPropiedades((prev) => prev.filter((propiedad) => propiedad.id_propiedad !== id))
      } else {
        throw new Error("Error al eliminar la propiedad")
      }
    } catch (error) {
      console.error("Error al eliminar propiedad:", error)
    }
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Propiedades</h2>
        <div className="flex items-center space-x-2">
          <Button asChild>
            <Link href="/propiedades/nuevo">
              <Building className="mr-2 h-4 w-4" />
              Nueva Propiedad
            </Link>
          </Button>
          <Button variant="outline">
            <FileDown className="mr-2 h-4 w-4" />
            Exportar PDF
          </Button>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Gestión de Propiedades</CardTitle>
          <CardDescription>
            Administre las propiedades de la inmobiliaria. Puede agregar, editar o eliminar propiedades.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between pb-4">
            <div className="relative w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Buscar propiedad..." className="w-full pl-8" />
            </div>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Dirección</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Asesor</TableHead>
                <TableHead>Fecha Captación</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {propiedades.map((propiedad) => (
                <TableRow key={propiedad.id_propiedad}>
                  <TableCell className="font-medium">{propiedad.direccion}</TableCell>
                  <TableCell>{propiedad.tipo}</TableCell>
                  <TableCell>{propiedad.asesor}</TableCell>
                  <TableCell>{new Date(propiedad.fechaCaptacion).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        propiedad.estado === "Disponible"
                          ? "default"
                          : propiedad.estado === "Alquilado"
                          ? "secondary"
                          : "outline"
                      }
                    >
                      {propiedad.estado}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button variant="ghost" size="icon" asChild>
                      <Link href={`/propiedades/${propiedad.id_propiedad}`}>
                        <Pencil className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(propiedad.id_propiedad)}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}