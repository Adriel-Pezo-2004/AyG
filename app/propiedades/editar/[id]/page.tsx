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
import { ArrowLeft, Save, Upload, X } from "lucide-react"
import Link from "next/link"

export default function EditarPropiedadPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [propiedad, setPropiedad] = useState({
    id: params.id,
    titulo: "Departamento en Cayma",
    tipo: "departamento",
    direccion: "Av. Ejército 123, Cayma",
    distrito: "cayma",
    precio: "250000",
    area: "120",
    dormitorios: "3",
    banos: "2",
    asesor: "1",
    estado: "disponible",
    descripcion: "Hermoso departamento con vista a la ciudad, amplio y luminoso.",
    imagenes: ["/placeholder.svg?height=100&width=100", "/placeholder.svg?height=100&width=100"],
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulación de guardado
    setTimeout(() => {
      setIsLoading(false)
      router.push("/propiedades")
    }, 1500)
  }

  const removeImage = (index: number) => {
    setPropiedad({
      ...propiedad,
      imagenes: propiedad.imagenes.filter((_, i) => i !== index),
    })
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Editar Propiedad</h2>
        <div className="flex items-center space-x-2">
          <Button variant="outline" asChild>
            <Link href="/propiedades">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver
            </Link>
          </Button>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Información de la Propiedad</CardTitle>
          <CardDescription>Actualice los datos de la propiedad.</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="titulo">Título</Label>
                <Input
                  id="titulo"
                  placeholder="Título de la propiedad"
                  value={propiedad.titulo}
                  onChange={(e) => setPropiedad({ ...propiedad, titulo: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tipo">Tipo de Propiedad</Label>
                <Select value={propiedad.tipo} onValueChange={(value) => setPropiedad({ ...propiedad, tipo: value })}>
                  <SelectTrigger id="tipo">
                    <SelectValue placeholder="Seleccionar tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="departamento">Departamento</SelectItem>
                    <SelectItem value="casa">Casa</SelectItem>
                    <SelectItem value="local">Local Comercial</SelectItem>
                    <SelectItem value="terreno">Terreno</SelectItem>
                    <SelectItem value="oficina">Oficina</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="direccion">Dirección</Label>
                <Input
                  id="direccion"
                  placeholder="Dirección completa"
                  value={propiedad.direccion}
                  onChange={(e) => setPropiedad({ ...propiedad, direccion: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="distrito">Distrito</Label>
                <Select
                  value={propiedad.distrito}
                  onValueChange={(value) => setPropiedad({ ...propiedad, distrito: value })}
                >
                  <SelectTrigger id="distrito">
                    <SelectValue placeholder="Seleccionar distrito" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="arequipa">Arequipa</SelectItem>
                    <SelectItem value="cayma">Cayma</SelectItem>
                    <SelectItem value="cerro_colorado">Cerro Colorado</SelectItem>
                    <SelectItem value="yanahuara">Yanahuara</SelectItem>
                    <SelectItem value="jlbyr">José Luis Bustamante y Rivero</SelectItem>
                    <SelectItem value="sachaca">Sachaca</SelectItem>
                    <SelectItem value="miraflores">Miraflores</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="precio">Precio (S/)</Label>
                <Input
                  id="precio"
                  type="number"
                  placeholder="0.00"
                  value={propiedad.precio}
                  onChange={(e) => setPropiedad({ ...propiedad, precio: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="area">Área (m²)</Label>
                <Input
                  id="area"
                  type="number"
                  placeholder="0"
                  value={propiedad.area}
                  onChange={(e) => setPropiedad({ ...propiedad, area: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dormitorios">Dormitorios</Label>
                <Input
                  id="dormitorios"
                  type="number"
                  placeholder="0"
                  value={propiedad.dormitorios}
                  onChange={(e) => setPropiedad({ ...propiedad, dormitorios: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="banos">Baños</Label>
                <Input
                  id="banos"
                  type="number"
                  placeholder="0"
                  value={propiedad.banos}
                  onChange={(e) => setPropiedad({ ...propiedad, banos: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="asesor">Asesor Asignado</Label>
                <Select
                  value={propiedad.asesor}
                  onValueChange={(value) => setPropiedad({ ...propiedad, asesor: value })}
                >
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
              <div className="space-y-2">
                <Label htmlFor="estado">Estado</Label>
                <Select
                  value={propiedad.estado}
                  onValueChange={(value) => setPropiedad({ ...propiedad, estado: value })}
                >
                  <SelectTrigger id="estado">
                    <SelectValue placeholder="Seleccionar estado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="disponible">Disponible</SelectItem>
                    <SelectItem value="alquilado">Alquilado</SelectItem>
                    <SelectItem value="vendido">Vendido</SelectItem>
                    <SelectItem value="en_proceso">En Proceso</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="descripcion">Descripción</Label>
                <Textarea
                  id="descripcion"
                  placeholder="Descripción detallada de la propiedad"
                  value={propiedad.descripcion}
                  onChange={(e) => setPropiedad({ ...propiedad, descripcion: e.target.value })}
                />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label>Imágenes</Label>
                <div className="flex flex-wrap gap-2 mb-4">
                  {propiedad.imagenes.map((imagen, index) => (
                    <div key={index} className="relative">
                      <img
                        src={imagen || "/placeholder.svg"}
                        alt={`Imagen ${index + 1}`}
                        className="w-24 h-24 object-cover rounded-md"
                      />
                      <button
                        type="button"
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                        onClick={() => removeImage(index)}
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-center w-full">
                  <label
                    htmlFor="dropzone-file"
                    className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-8 h-8 mb-2 text-gray-500" />
                      <p className="mb-2 text-sm text-gray-500">
                        <span className="font-semibold">Haga clic para cargar</span> o arrastre y suelte
                      </p>
                      <p className="text-xs text-gray-500">SVG, PNG, JPG o GIF (MAX. 5MB)</p>
                    </div>
                    <input id="dropzone-file" type="file" className="hidden" multiple />
                  </label>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" type="button" onClick={() => router.push("/propiedades")}>
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
