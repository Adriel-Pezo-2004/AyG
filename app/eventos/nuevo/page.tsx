"use client"

import { useState } from "react"
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
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { cn } from "@/lib/utils"

export default function NuevoEventoPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [fecha, setFecha] = useState<Date>()
  const [hora, setHora] = useState<string>("10:00")
  const [form, setForm] = useState({
    titulo: "",
    tipo: "",
    estado: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.id]: e.target.value })
  }

  const handleSelect = (field: string, value: string) => {
    setForm({ ...form, [field]: value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      if (!fecha) throw new Error("Debe seleccionar una fecha")
      if (!form.titulo || !form.tipo || !form.estado) throw new Error("Complete todos los campos obligatorios")
      const res = await fetch("/api/eventos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          titulo: form.titulo,
          tipo: form.tipo,
          fecha: format(fecha, "yyyy-MM-dd"),
          hora,
          estado: form.estado,
        }),
      })
      if (res.ok) {
        router.push("/eventos")
      } else {
        throw new Error("Error al crear evento")
      }
    } catch (error) {
      alert(error instanceof Error ? error.message : "Error al crear evento")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Nuevo Evento</h2>
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
          <CardDescription>Ingrese los datos del nuevo evento.</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="titulo">Título</Label>
                <Input id="titulo" value={form.titulo} onChange={handleChange} placeholder="Título del evento" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tipo">Tipo de Evento</Label>
                <Select value={form.tipo} onValueChange={v => handleSelect("tipo", v)}>
                  <SelectTrigger id="tipo">
                    <SelectValue placeholder="Seleccionar tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Visita">Visita</SelectItem>
                    <SelectItem value="Firma">Firma</SelectItem>
                    <SelectItem value="Entrega">Entrega</SelectItem>
                    <SelectItem value="Tasación">Tasación</SelectItem>
                    <SelectItem value="Reunión">Reunión</SelectItem>
                    <SelectItem value="Otro">Otro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="estado">Estado</Label>
                <Select value={form.estado} onValueChange={v => handleSelect("estado", v)}>
                  <SelectTrigger id="estado">
                    <SelectValue placeholder="Seleccionar estado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Pendiente">Pendiente</SelectItem>
                    <SelectItem value="Confirmado">Confirmado</SelectItem>
                    <SelectItem value="Cancelado">Cancelado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="fecha">Fecha</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn("w-full justify-start text-left font-normal", !fecha && "text-muted-foreground")}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {fecha ? format(fecha, "dd/MM/yyyy", { locale: es }) : <span>Seleccionar fecha</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={fecha} onSelect={setFecha} initialFocus locale={es} />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-2">
                <Label htmlFor="hora">Hora</Label>
                <Input
                  id="hora"
                  type="time"
                  value={hora}
                  onChange={(e) => setHora(e.target.value)}
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