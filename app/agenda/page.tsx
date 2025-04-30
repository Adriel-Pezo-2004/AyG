"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, dateFnsLocalizer } from "react-big-calendar"
import { format, parse, startOfWeek, getDay } from "date-fns"
import { es } from "date-fns/locale"
import "react-big-calendar/lib/css/react-big-calendar.css"
import { Plus, ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const locales = {
  es: es,
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
})

export default function AgendaPage() {
  const [view, setView] = useState("month")
  const [date, setDate] = useState(new Date())

  // Eventos de ejemplo
  const eventos = [
    {
      id: 1,
      title: "Visita a departamento en Cayma",
      start: new Date(2024, 4, 20, 10, 0),
      end: new Date(2024, 4, 20, 11, 0),
      resourceId: 1,
    },
    {
      id: 2,
      title: "Firma de contrato de alquiler",
      start: new Date(2024, 4, 22, 11, 30),
      end: new Date(2024, 4, 22, 12, 30),
      resourceId: 2,
    },
    {
      id: 3,
      title: "Entrega de llaves",
      start: new Date(2024, 4, 25, 9, 0),
      end: new Date(2024, 4, 25, 10, 0),
      resourceId: 3,
    },
    {
      id: 4,
      title: "Tasación de propiedad",
      start: new Date(2024, 4, 27, 15, 0),
      end: new Date(2024, 4, 27, 16, 0),
      resourceId: 4,
    },
    {
      id: 5,
      title: "Reunión con propietario",
      start: new Date(2024, 4, 30, 16, 30),
      end: new Date(2024, 4, 30, 17, 30),
      resourceId: 5,
    },
  ]

  // Recursos (asesores)
  const resources = [
    { id: 1, title: "Carlos Mendoza" },
    { id: 2, title: "María López" },
    { id: 3, title: "Juan Pérez" },
    { id: 4, title: "Ana García" },
    { id: 5, title: "Roberto Sánchez" },
  ]

  const handleNavigate = (action: string) => {
    const newDate = new Date(date)
    if (action === "PREV") {
      if (view === "month") {
        newDate.setMonth(newDate.getMonth() - 1)
      } else if (view === "week") {
        newDate.setDate(newDate.getDate() - 7)
      } else if (view === "day") {
        newDate.setDate(newDate.getDate() - 1)
      }
    } else if (action === "NEXT") {
      if (view === "month") {
        newDate.setMonth(newDate.getMonth() + 1)
      } else if (view === "week") {
        newDate.setDate(newDate.getDate() + 7)
      } else if (view === "day") {
        newDate.setDate(newDate.getDate() + 1)
      }
    } else if (action === "TODAY") {
      return setDate(new Date())
    }
    setDate(newDate)
  }

  const messages = {
    today: "Hoy",
    previous: "Anterior",
    next: "Siguiente",
    month: "Mes",
    week: "Semana",
    day: "Día",
    agenda: "Agenda",
    date: "Fecha",
    time: "Hora",
    event: "Evento",
    allDay: "Todo el día",
    noEventsInRange: "No hay eventos en este rango.",
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Agenda</h2>
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
          <CardTitle>Calendario de Eventos</CardTitle>
          <CardDescription>Visualice y administre todos los eventos programados en el calendario.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={() => handleNavigate("TODAY")}>
                Hoy
              </Button>
              <Button variant="outline" size="icon" onClick={() => handleNavigate("PREV")}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={() => handleNavigate("NEXT")}>
                <ChevronRight className="h-4 w-4" />
              </Button>
              <div className="text-sm font-medium">
                {format(date, view === "month" ? "MMMM yyyy" : "dd MMMM yyyy", { locale: es })}
              </div>
            </div>
            <Select value={view} onValueChange={setView}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Seleccionar vista" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="month">Mes</SelectItem>
                <SelectItem value="week">Semana</SelectItem>
                <SelectItem value="day">Día</SelectItem>
                <SelectItem value="agenda">Agenda</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="h-[600px]">
            <Calendar
              localizer={localizer}
              events={eventos}
              startAccessor="start"
              endAccessor="end"
              resources={resources}
              resourceIdAccessor="id"
              resourceTitleAccessor="title"
              views={["month", "week", "day", "agenda"]}
              view={view as any}
              date={date}
              messages={messages}
              culture="es"
              onView={(newView) => setView(newView)}
              onNavigate={(newDate) => setDate(newDate as Date)}
              className="rounded-md border"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
