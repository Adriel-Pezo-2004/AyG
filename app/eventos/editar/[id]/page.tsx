"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Save, CalendarIcon } from "lucide-react"
import Link from "next/link"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { format, parseISO } from "date-fns"
import { es } from "date-fns/locale"
import { cn } from "@/lib/utils"

export default function EditarEventoPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [evento, setEvento] = useState<{
    titulo: string
    tipo: string
    fecha: Date | null
    hora: string
    estado: string
  }>({
    titulo: "",
    tipo: "",
    fecha: null,
    hora: "10:00",
    estado: "",
  })

  // Cargar datos del evento al montar
  useEffect(() => {
    const fetchEvento = async () => {
      try {
        const res = await fetch(`/api/eventos/${params.id}`)
        if (res.ok) {
          const data = await res.json()

          // Parsear la fecha correctamente
          const fecha = data.fecha ? parseISO(data.fecha) : null

          // Formatear la hora correctamente (HH:mm)
          const hora = data.hora || "10:00"

          setEvento({
            titulo: data.titulo || "",
            tipo: data.tipo || "",
            fecha: fecha,
            hora: hora,
            estado: data.estado || "",
          })
        }
      } catch (error) {
        console.error("Error al cargar evento:", error)
      }
    }
    fetchEvento()
  }, [params.id])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      if (!evento.fecha) throw new Error("Debe seleccionar una fecha")

      // Preparar los datos para enviar
      const dataToSend = {
        titulo: evento.titulo,
        tipo: evento.tipo,
        fecha: format(evento.fecha, "yyyy-MM-dd"),
        hora: evento.hora,
        estado: evento.estado,
      }

      const res = await fetch(`/api/eventos/${params.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSend),
      })

      if (res.ok) {
        router.push("/eventos")
      } else {
        const errorData = await res.json()
        throw new Error(errorData.error || "Error al actualizar evento")
      }
    } catch (error) {
      alert(error instanceof Error ? error.message : "Error al actualizar evento")
    } finally {
      setIsLoading(false)
    }
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
                        !evento.fecha && "text-muted-foreground"
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
                      selected={evento.fecha ?? undefined}
                      onSelect={(date) => date && setEvento({ ...evento, fecha: date })}
                      initialFocus
                      locale={es}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-2">
                <Label htmlFor="hora">Hora</Label>
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