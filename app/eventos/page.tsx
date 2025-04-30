import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Pencil, Trash2, Plus } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export default function EventosPage() {
  const eventos = [
    {
      id: "1",
      titulo: "Visita a departamento en Cayma",
      tipo: "Visita",
      cliente: "Luis Ramírez",
      asesor: "Carlos Mendoza",
      fecha: "20/05/2024",
      hora: "10:00 AM",
      estado: "Pendiente",
    },
    {
      id: "2",
      titulo: "Firma de contrato de alquiler",
      tipo: "Firma",
      cliente: "Sofía Torres",
      asesor: "María López",
      fecha: "22/05/2024",
      hora: "11:30 AM",
      estado: "Confirmado",
    },
    {
      id: "3",
      titulo: "Entrega de llaves",
      tipo: "Entrega",
      cliente: "Miguel Ángel Castro",
      asesor: "Juan Pérez",
      fecha: "25/05/2024",
      hora: "09:00 AM",
      estado: "Pendiente",
    },
    {
      id: "4",
      titulo: "Tasación de propiedad",
      tipo: "Tasación",
      cliente: "Carmen Vega",
      asesor: "Ana García",
      fecha: "27/05/2024",
      hora: "03:00 PM",
      estado: "Confirmado",
    },
    {
      id: "5",
      titulo: "Reunión con propietario",
      tipo: "Reunión",
      cliente: "Jorge Mendoza",
      asesor: "Roberto Sánchez",
      fecha: "30/05/2024",
      hora: "04:30 PM",
      estado: "Cancelado",
    },
  ]

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
                <TableHead>Cliente</TableHead>
                <TableHead>Asesor</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead>Hora</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {eventos.map((evento) => (
                <TableRow key={evento.id}>
                  <TableCell className="font-medium">{evento.titulo}</TableCell>
                  <TableCell>{evento.tipo}</TableCell>
                  <TableCell>{evento.cliente}</TableCell>
                  <TableCell>{evento.asesor}</TableCell>
                  <TableCell>{evento.fecha}</TableCell>
                  <TableCell>{evento.hora}</TableCell>
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
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" asChild>
                      <Link href={`/eventos/editar/${evento.id}`}>
                        <Pencil className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Trash2 className="h-4 w-4" />
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
