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
import { ArrowLeft, Save } from "lucide-react"
import Link from "next/link"

export default function EditarClientePage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [cliente, setCliente] = useState({
    id: params.id,
    nombre: "Luis Ramírez",
    email: "luis.ramirez@gmail.com",
    telefono: "+51 987 654 321",
    dni: "12345678",
    direccion: "Av. Ejército 123, Cayma, Arequipa",
    tipo: "comprador",
    origen: "referido",
    asesor: "1",
    observaciones: "Cliente interesado en departamentos en Cayma o Yanahuara.",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulación de guardado
    setTimeout(() => {
      setIsLoading(false)
      router.push("/clientes")
    }, 1500)
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Editar Cliente</h2>
        <div className="flex items-center space-x-2">
          <Button variant="outline" asChild>
            <Link href="/clientes">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver
            </Link>
          </Button>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Información del Cliente</CardTitle>
          <CardDescription>Actualice los datos del cliente.</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="nombre">Nombre Completo</Label>
                <Input
                  id="nombre"
                  placeholder="Nombre completo"
                  value={cliente.nombre}
                  onChange={(e) => setCliente({ ...cliente, nombre: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Correo Electrónico</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="correo@ejemplo.com"
                  value={cliente.email}
                  onChange={(e) => setCliente({ ...cliente, email: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="telefono">Teléfono</Label>
                <Input
                  id="telefono"
                  placeholder="+51 999 999 999"
                  value={cliente.telefono}
                  onChange={(e) => setCliente({ ...cliente, telefono: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dni">DNI / RUC</Label>
                <Input
                  id="dni"
                  placeholder="Número de documento"
                  value={cliente.dni}
                  onChange={(e) => setCliente({ ...cliente, dni: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="direccion">Dirección</Label>
                <Input
                  id="direccion"
                  placeholder="Dirección completa"
                  value={cliente.direccion}
                  onChange={(e) => setCliente({ ...cliente, direccion: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tipo">Tipo de Cliente</Label>
                <Select value={cliente.tipo} onValueChange={(value) => setCliente({ ...cliente, tipo: value })}>
                  <SelectTrigger id="tipo">
                    <SelectValue placeholder="Seleccionar tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="comprador">Comprador</SelectItem>
                    <SelectItem value="vendedor">Vendedor</SelectItem>
                    <SelectItem value="arrendatario">Arrendatario</SelectItem>
                    <SelectItem value="arrendador">Arrendador</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="origen">Origen</Label>
                <Select value={cliente.origen} onValueChange={(value) => setCliente({ ...cliente, origen: value })}>
                  <SelectTrigger id="origen">
                    <SelectValue placeholder="Seleccionar origen" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="referido">Referido</SelectItem>
                    <SelectItem value="web">Sitio Web</SelectItem>
                    <SelectItem value="redes">Redes Sociales</SelectItem>
                    <SelectItem value="publicidad">Publicidad</SelectItem>
                    <SelectItem value="otro">Otro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="asesor">Asesor Asignado</Label>
                <Select value={cliente.asesor} onValueChange={(value) => setCliente({ ...cliente, asesor: value })}>
                  <SelectTrigger id="asesor">
                    <SelectValue placeholder="Seleccionar asesor" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Carlos Mendoza</SelectItem>
                    <SelectItem value="2">María López</SelectItem>
                    <SelectItem value="3">Juan Pérez</SelectItem>
                    <SelectItem value="4">Ana García</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="observaciones">Observaciones</Label>
                <Textarea
                  id="observaciones"
                  placeholder="Observaciones adicionales"
                  value={cliente.observaciones}
                  onChange={(e) => setCliente({ ...cliente, observaciones: e.target.value })}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" type="button" onClick={() => router.push("/clientes")}>
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
