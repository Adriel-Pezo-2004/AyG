"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Pencil, Trash2, Plus } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Input } from "@/components/ui/input"

export default function EventosPage() {
  interface Evento {
    id_evento: number
    titulo: string
    tipo: string
    fecha: string // ISO string
    hora: string  // ISO string o "HH:mm:ss"
    estado: string
  }

  const [eventos, setEventos] = useState<Evento[]>([])

  useEffect(() => {
    const fetchEventos = async () => {
      try {
        const res = await fetch("/api/eventos")
        if (!res.ok) throw new Error("Error al cargar eventos")
        const data = await res.json()
        setEventos(data)
      } catch (error) {
        console.error("Error al obtener eventos:", error)
      }
    }

    fetchEventos()
  }, [])

  const handleDelete = async (id: number) => {
    try {
      const confirmDelete = window.confirm("¿Estás seguro de eliminar este evento?")
      if (!confirmDelete) return

      const response = await fetch(`/api/eventos/${id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        setEventos(prev => prev.filter(e => e.id_evento !== id))
      } else {
        const errorData = await response.json()
        throw new Error(errorData.error || "Error al eliminar")
      }
    } catch (error) {
      console.error("Error al eliminar:", error)
    }
  }

  // Helper para mostrar fecha y hora legibles
  const formatFecha = (fecha: string) => {
    try {
      return new Date(fecha).toLocaleDateString()
    } catch {
      return fecha
    }
  }
  const formatHora = (hora: string) => {
    try {
      // Si es string tipo "2024-05-25T09:00:00.000Z"
      const d = new Date(hora)
      if (!isNaN(d.getTime())) return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      // Si es "09:00:00"
      return hora.slice(0, 5)
    } catch {
      return hora
    }
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Eventos</h2>
        <div className="flex items-center space-x-2">
          <Button asChild>
            <Link href="/eventos/nuevo">
              <Plus className="mr-2 h-4 w-4" />
              Nuevo Evento
            </Link>
          </Button>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Gestión de Eventos</CardTitle>
          <CardDescription>
            Administre los eventos programados. Puede agregar, editar o eliminar eventos.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between pb-4">
            <div className="relative w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Buscar evento..." className="w-full pl-8" />
            </div>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Título</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead>Hora</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {eventos.map((evento) => (
                <TableRow key={evento.id_evento}>
                  <TableCell className="font-medium">{evento.titulo}</TableCell>
                  <TableCell>{evento.tipo}</TableCell>
                  <TableCell>{formatFecha(evento.fecha)}</TableCell>
                  <TableCell>{formatHora(evento.hora)}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        evento.estado === "Confirmado"
                          ? "default"
                          : evento.estado === "Pendiente"
                            ? "secondary"
                            : "outline"
                      }
                      className={evento.estado === "Cancelado" ? "bg-red-100 text-red-800" : ""}
                    >
                      {evento.estado}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right space-x-1">
                    <Button variant="ghost" size="icon" asChild>
                      <Link href={`/eventos/editar/${evento.id_evento}`}>
                        <Pencil className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => handleDelete(evento.id_evento)}
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