"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Save, CalendarIcon } from "lucide-react"
import Link from "next/link"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { cn } from "@/lib/utils"

export default function EditarEventoPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [evento, setEvento] = useState({
    id: params.id,
    titulo: "Visita a departamento en Cayma",
    tipo: "visita",
    cliente: "1",
    asesor: "1",
    propiedad: "1",
    estado: "pendiente",
    fecha: new Date(2024, 4, 20),
    hora: "10:00",
    descripcion: "Visita programada para mostrar el departamento al cliente interesado.",
    recordatorio: "30min",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulación de guardado
    setTimeout(() => {
      setIsLoading(false)
      router.push("/eventos")
    }, 1500)
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Editar Evento</h2>
        <div className="flex items-center space-x-2">
          <Button variant="outline" asChild>
            <Link href="/eventos">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver
            </Link>
          </Button>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Información del Evento</CardTitle>
          <CardDescription>Actualice los datos del evento.</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="titulo">Título</Label>
                <Input
                  id="titulo"
                  placeholder="Título del evento"
                  value={evento.titulo}
                  onChange={(e) => setEvento({ ...evento, titulo: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tipo">Tipo de Evento</Label>
                <Select value={evento.tipo} onValueChange={(value) => setEvento({ ...evento, tipo: value })}>
                  <SelectTrigger id="tipo">
                    <SelectValue placeholder="Seleccionar tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="visita">Visita</SelectItem>
                    <SelectItem value="firma">Firma</SelectItem>
                    <SelectItem value="entrega">Entrega</SelectItem>
                    <SelectItem value="tasacion">Tasación</SelectItem>
                    <SelectItem value="reunion">Reunión</SelectItem>
                    <SelectItem value="otro">Otro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="cliente">Cliente</Label>
                <Select value={evento.cliente} onValueChange={(value) => setEvento({ ...evento, cliente: value })}>
                  <SelectTrigger id="cliente">
                    <SelectValue placeholder="Seleccionar cliente" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Luis Ramírez</SelectItem>
                    <SelectItem value="2">Sofía Torres</SelectItem>
                    <SelectItem value="3">Miguel Ángel Castro</SelectItem>
                    <SelectItem value="4">Carmen Vega</SelectItem>
                    <SelectItem value="5">Jorge Mendoza</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="asesor">Asesor</Label>
                <Select value={evento.asesor} onValueChange={(value) => setEvento({ ...evento, asesor: value })}>
                  <SelectTrigger id="asesor">
                    <SelectValue placeholder="Seleccionar asesor" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Carlos Mendoza</SelectItem>
                    <SelectItem value="2">María López</SelectItem>
                    <SelectItem value="3">Juan Pérez</SelectItem>
                    <SelectItem value="4">Ana García</SelectItem>
                    <SelectItem value="5">Roberto Sánchez</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="propiedad">Propiedad (Opcional)</Label>
                <Select value={evento.propiedad} onValueChange={(value) => setEvento({ ...evento, propiedad: value })}>
                  <SelectTrigger id="propiedad">
                    <SelectValue placeholder="Seleccionar propiedad" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Av. Javier Prado 2340, San Isidro</SelectItem>
                    <SelectItem value="2">Jr. Salaverry 234, Miraflores</SelectItem>
                    <SelectItem value="3">Calle Los Pinos 567, La Molina</SelectItem>
                    <SelectItem value="4">Av. Arequipa 890, Lince</SelectItem>
                    <SelectItem value="5">Calle Schell 452, Miraflores</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="estado">Estado</Label>
                <Select value={evento.estado} onValueChange={(value) => setEvento({ ...evento, estado: value })}>
                  <SelectTrigger id="estado">
                    <SelectValue placeholder="Seleccionar estado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pendiente">Pendiente</SelectItem>
                    <SelectItem value="confirmado">Confirmado</SelectItem>
                    <SelectItem value="cancelado">Cancelado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="fecha">Fecha</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !evento.fecha && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {evento.fecha ? (
                        format(evento.fecha, "dd/MM/yyyy", { locale: es })
                      ) : (
                        <span>Seleccionar fecha</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={evento.fecha}
                      onSelect={(date) => date && setEvento({ ...evento, fecha: date })}
                      initialFocus
                      locale={es}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-2">
                <Label htmlFor="hora">Hora</Label>
                <div className="flex items-center">
                  <Input
                    id="hora"
                    type="time"
                    value={evento.hora}
                    onChange={(e) => setEvento({ ...evento, hora: e.target.value })}
                    className="w-full"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="descripcion">Descripción</Label>
                <Textarea
                  id="descripcion"
                  placeholder="Descripción detallada del evento"
                  value={evento.descripcion}
                  onChange={(e) => setEvento({ ...evento, descripcion: e.target.value })}
                />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="recordatorio">Recordatorio</Label>
                <Select
                  value={evento.recordatorio}
                  onValueChange={(value) => setEvento({ ...evento, recordatorio: value })}
                >
                  <SelectTrigger id="recordatorio">
                    <SelectValue placeholder="Seleccionar recordatorio" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ninguno">Ninguno</SelectItem>
                    <SelectItem value="15min">15 minutos antes</SelectItem>
                    <SelectItem value="30min">30 minutos antes</SelectItem>
                    <SelectItem value="1hora">1 hora antes</SelectItem>
                    <SelectItem value="1dia">1 día antes</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" type="button" onClick={() => router.push("/eventos")}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isLoading}>
              <Save className="mr-2 h-4 w-4" />
              {isLoading ? "Guardando..." : "Guardar"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
