"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Save } from "lucide-react"
import Link from "next/link"

export default function NuevoAsesorPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    usuario: "",
    contraseña: "",
    nombres: "",
    apellidos: "",
    tipo_documento: "DNI",
    numero_documento: "",
    ruc: "",
    genero: "M",
    celular: "",
    departamento: "",
    provincia: "",
    distrito: "",
    imagen: null as File | null, // Para manejar la imagen
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setFormData((prev) => ({ ...prev, imagen: file }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const formDataToSend = new FormData()
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null) {
          formDataToSend.append(key, value as string | Blob)
        }
      })

      const res = await fetch("/api/usuarios", {
        method: "POST",
        body: formDataToSend,
      })

      if (res.ok) {
        router.push("/asesores")
      } else {
        const data = await res.json()
        alert(data.error || "Error al crear el asesor")
      }
    } catch (error) {
      console.error("Error al crear asesor:", error)
      alert("Ocurrió un error. Intente nuevamente.")
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Nuevo Asesor</h2>
        <div className="flex items-center space-x-2">
          <Button variant="outline" asChild>
            <Link href="/asesores">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver
            </Link>
          </Button>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Información del Asesor</CardTitle>
          <CardDescription>Ingrese los datos del nuevo asesor.</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="usuario">Correo</Label>
                <Input id="usuario" name="usuario" placeholder="Nombre de usuario" value={formData.usuario} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contraseña">Contraseña</Label>
                <Input id="contraseña" name="contraseña" type="password" placeholder="Contraseña" value={formData.contraseña} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="nombres">Nombres</Label>
                <Input id="nombres" name="nombres" placeholder="Nombres" value={formData.nombres} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="apellidos">Apellidos</Label>
                <Input id="apellidos" name="apellidos" placeholder="Apellidos" value={formData.apellidos} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tipo_documento">Tipo de Documento</Label>
                <Select name="tipo_documento" value={formData.tipo_documento} onValueChange={(value) => setFormData((prev) => ({ ...prev, tipo_documento: value }))}>
                  <SelectTrigger id="tipo_documento">
                    <SelectValue placeholder="Seleccionar tipo de documento" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="DNI">DNI</SelectItem>
                    <SelectItem value="RUC">RUC</SelectItem>
                    <SelectItem value="Pasaporte">Pasaporte</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="numero_documento">Número de Documento</Label>
                <Input id="numero_documento" name="numero_documento" placeholder="Número de documento" value={formData.numero_documento} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ruc">RUC</Label>
                <Input id="ruc" name="ruc" placeholder="RUC (opcional)" value={formData.ruc} onChange={handleChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="genero">Género</Label>
                <Select name="genero" value={formData.genero} onValueChange={(value) => setFormData((prev) => ({ ...prev, genero: value }))}>
                  <SelectTrigger id="genero">
                    <SelectValue placeholder="Seleccionar género" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="M">Masculino</SelectItem>
                    <SelectItem value="F">Femenino</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="celular">Celular</Label>
                <Input id="celular" name="celular" placeholder="Número de celular" value={formData.celular} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="departamento">Departamento</Label>
                <Input id="departamento" name="departamento" placeholder="Departamento" value={formData.departamento} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="provincia">Provincia</Label>
                <Input id="provincia" name="provincia" placeholder="Provincia" value={formData.provincia} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="distrito">Distrito</Label>
                <Input id="distrito" name="distrito" placeholder="Distrito" value={formData.distrito} onChange={handleChange} required />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" type="button" onClick={() => router.push("/asesores")}>
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