"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Save } from "lucide-react"
import Link from "next/link"
import { Item } from "@radix-ui/react-select"

export default function NuevaPropiedadPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [contactos, setContactos] = useState([]) // Lista de contactos
  const [formData, setFormData] = useState({
    id_contacto: "", // Nuevo campo para el contacto
    titulo: "",
    descripcion: "",
    tipo_pro: "",
    subtipo: "",
    antiguedad: "",
    area_terreno: "",
    area_construida: "",
    tipo_negocio: "",
    precio: "",
    departamento: "",
    provincia: "",
    distrito: "",
    urbanizacion: "",
    direccion: "",
    pisos: "",
    dormitorios: "",
    baños: "",
    cocheras: "",
    mantenimiento: "",
    cocinas: "",
    medbaños: "",
    ascensor: "",
    terrazas: "",
    estado: "",
    usuario_insertor: "",
    imagenes: [] as File[],
    cp: [] as File[],
    dni: [] as File[],
    hr: [] as File[],
    pu: [] as File[],
  })

  // Obtener la lista de contactos al cargar la página
  useEffect(() => {
    const fetchContactos = async () => {
      try {
        const res = await fetch("/api/contactos")
        if (!res.ok) throw new Error("Error al cargar contactos")
        const data = await res.json()
        setContactos(data)
      } catch (error) {
        console.error("Error al obtener contactos:", error)
      }
    }

    fetchContactos()
  }, [])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    const files = e.target.files ? Array.from(e.target.files) : []
    setFormData((prev) => ({ ...prev, [field]: files }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const formDataToSend = new FormData()
      Object.entries(formData).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach((file) => formDataToSend.append(key, file))
        } else {
          formDataToSend.append(key, value as string)
        }
      })

      const res = await fetch("/api/propiedades", {
        method: "POST",
        body: formDataToSend,
      })

      if (res.ok) {
        router.push("/propiedades")
      } else {
        throw new Error("Error al crear propiedad")
      }
    } catch (error) {
      console.error("Error al crear propiedad:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Nueva Propiedad</h2>
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
          <CardDescription>Ingrese los datos de la nueva propiedad.</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="id_contacto">Contacto</Label>
                <Select
                  value={formData.id_contacto}
                  onValueChange={(value) => setFormData({ ...formData, id_contacto: value })}
                >
                  <SelectTrigger id="id_contacto">
                    <SelectValue placeholder="Seleccione un contacto" />
                  </SelectTrigger>
                  <SelectContent>
              
                      <SelectItem key="12000" value={formData.id_contacto}>
                        Adriel Pezo
                      </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="titulo">Título</Label>
                <Input
                  id="titulo"
                  placeholder="Título de la propiedad"
                  value={formData.titulo}
                  onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="descripcion">Descripción</Label>
                <Textarea
                  id="descripcion"
                  placeholder="Descripción de la propiedad"
                  value={formData.descripcion}
                  onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tipo_pro">Tipo de Propiedad</Label>
                <Input
                  id="tipo_pro"
                  placeholder="Ejemplo: Casa, Departamento"
                  value={formData.tipo_pro}
                  onChange={(e) => setFormData({ ...formData, tipo_pro: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="subtipo">Subtipo</Label>
                <Input
                  id="subtipo"
                  placeholder="Ejemplo: Duplex, Penthouse"
                  value={formData.subtipo}
                  onChange={(e) => setFormData({ ...formData, subtipo: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="antiguedad">Antigüedad</Label>
                <Input
                  id="antiguedad"
                  type="number"
                  placeholder="Años de antigüedad"
                  value={formData.antiguedad}
                  onChange={(e) => setFormData({ ...formData, antiguedad: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="imagenes">Imágenes</Label>
                <Input
                  id="imagenes"
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, "imagenes")}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cp">Documentos CP</Label>
                <Input
                  id="cp"
                  type="file"
                  multiple
                  onChange={(e) => handleFileChange(e, "cp")}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dni">Documentos DNI</Label>
                <Input
                  id="dni"
                  type="file"
                  multiple
                  onChange={(e) => handleFileChange(e, "dni")}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="hr">Documentos HR</Label>
                <Input
                  id="hr"
                  type="file"
                  multiple
                  onChange={(e) => handleFileChange(e, "hr")}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="pu">Documentos PU</Label>
                <Input
                  id="pu"
                  type="file"
                  multiple
                  onChange={(e) => handleFileChange(e, "pu")}
                />
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