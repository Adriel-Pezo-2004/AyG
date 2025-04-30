"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { UserPlus, Search, Pencil, Trash2 } from "lucide-react"
import Link from "next/link"

export default function AsesoresPage() {
  interface Asesor {
    user_id: string
    nombres: string
    apellidos: string
    usuario: string
    celular: string
    departamento: string
    provincia: string
    distrito: string
    imagen: string | null // Ahora puede ser base64 string o null
  }

  const [asesores, setAsesores] = useState<Asesor[]>([])

  useEffect(() => {
    const fetchAsesores = async () => {
      try {
        const res = await fetch("/api/usuarios")
        if (!res.ok) throw new Error("Error al cargar asesores")
        const data = await res.json()
        setAsesores(data)
      } catch (error) {
        console.error("Error al obtener asesores:", error)
        // Puedes agregar un toast de error aquí
      }
    }

    fetchAsesores()
  }, [])

  const handleDelete = async (userId: string) => {
    try {
      const confirmDelete = window.confirm("¿Estás seguro de eliminar este asesor?")
      if (!confirmDelete) return

      const response = await fetch(`/api/usuarios/${userId}`, {
        method: 'DELETE'
      })
      
      if (response.ok) {
        // Actualización optimista del estado
        setAsesores(prev => prev.filter(a => a.user_id !== userId))
        // Opcional: Mostrar toast de éxito
      } else {
        const errorData = await response.json()
        throw new Error(errorData.error || "Error al eliminar")
      }
    } catch (error) {
      console.error("Error al eliminar:", error)
      // Mostrar toast de error
    }
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Asesores</h2>
        <div className="flex items-center space-x-2">
          <Button asChild>
            <Link href="/asesores/nuevo">
              <UserPlus className="mr-2 h-4 w-4" />
              Nuevo Asesor
            </Link>
          </Button>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Gestión de Asesores</CardTitle>
          <CardDescription>
            Administre los asesores de la inmobiliaria. Puede agregar, editar o eliminar asesores.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between pb-4">
            <div className="relative w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <input 
                type="search" 
                placeholder="Buscar asesor..." 
                className="w-full pl-8" 
                onChange={(e) => {
                  // Implementar búsqueda si es necesario
                }}
              />
            </div>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Imagen</TableHead>
                <TableHead>Nombre</TableHead>
                <TableHead>Usuario</TableHead>
                <TableHead>Teléfono</TableHead>
                <TableHead>Departamento</TableHead>
                <TableHead>Provincia</TableHead>
                <TableHead>Distrito</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {asesores.map((asesor) => (
                <TableRow key={asesor.user_id}>
                  <TableCell>
                    {asesor.imagen ? (
                      <img
                        src={asesor.imagen.startsWith('data:image') 
                          ? asesor.imagen 
                          : `data:image/jpeg;base64,${asesor.imagen}`}
                        alt={`${asesor.nombres} ${asesor.apellidos}`}
                        className="h-12 w-12 rounded-full object-cover"
                        onError={(e) => {
                          // Fallback si la imagen no carga
                          const target = e.target as HTMLImageElement
                          target.onerror = null
                          target.src = '/avatar-placeholder.png'
                        }}
                      />
                    ) : (
                      <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center">
                        <span className="text-xs text-gray-500">Sin foto</span>
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="font-medium">{`${asesor.nombres} ${asesor.apellidos}`}</TableCell>
                  <TableCell>{asesor.usuario}</TableCell>
                  <TableCell>{asesor.celular}</TableCell>
                  <TableCell>{asesor.departamento}</TableCell>
                  <TableCell>{asesor.provincia}</TableCell>
                  <TableCell>{asesor.distrito}</TableCell>
                  <TableCell className="text-right space-x-1">
                    <Button variant="ghost" size="icon" asChild>
                      <Link href={`/asesores/editar/${asesor.user_id}`}>
                        <Pencil className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => handleDelete(asesor.user_id)}
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