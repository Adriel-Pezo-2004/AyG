"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ArrowLeft, Save } from "lucide-react"
import Link from "next/link"

export default function EditarAsesorPage() {
  const params = useParams()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    usuario: "",
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
    imagen: null as File | null,
  })
  const [preview, setPreview] = useState<string | null>(null)

  useEffect(() => {
    const fetchAsesor = async () => {
      try {
        const res = await fetch(`/api/usuarios/${params.id}`)
        if (res.ok) {
          const data = await res.json()
          setFormData({
            usuario: data.usuario || "",
            nombres: data.nombres || "",
            apellidos: data.apellidos || "",
            tipo_documento: data.tipo_documento || "DNI",
            numero_documento: data.numero_documento || "",
            ruc: data.ruc || "",
            genero: data.genero || "M",
            celular: data.celular || "",
            departamento: data.departamento || "",
            provincia: data.provincia || "",
            distrito: data.distrito || "",
            imagen: null,
          })
          if (data.imagen) {
            setPreview(`data:image/jpeg;base64,${data.imagen}`)
          }
        } else {
          alert("Error al obtener los datos del asesor")
        }
      } catch (error) {
        console.error("Error al obtener asesor:", error)
        alert("Ocurrió un error al obtener los datos del asesor")
      }
    }

    fetchAsesor()
  }, [params.id])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    if (file) {
      setFormData((prev) => ({ ...prev, imagen: file }))
      const reader = new FileReader()
      reader.onload = () => setPreview(reader.result as string)
      reader.readAsDataURL(file)
    } else {
      setFormData((prev) => ({ ...prev, imagen: null }))
      setPreview(null)
    }
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

      const res = await fetch(`/api/usuarios/${params.id}`, {
        method: "PUT",
        body: formDataToSend,
      })

      if (res.ok) {
        router.push("/asesores")
      } else {
        const data = await res.json()
        alert(data.error || "Error al actualizar el asesor")
      }
    } catch (error) {
      console.error("Error al actualizar asesor:", error)
      alert("Ocurrió un error al actualizar el asesor")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Editar Asesor</h2>
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
          <CardDescription>Actualice los datos del asesor.</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="usuario">Usuario</Label>
                <Input
                  id="usuario"
                  name="usuario"
                  placeholder="Nombre de usuario"
                  value={formData.usuario}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="nombres">Nombres</Label>
                <Input
                  id="nombres"
                  name="nombres"
                  placeholder="Nombres"
                  value={formData.nombres}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="apellidos">Apellidos</Label>
                <Input
                  id="apellidos"
                  name="apellidos"
                  placeholder="Apellidos"
                  value={formData.apellidos}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tipo_documento">Tipo de Documento</Label>
                <Select
                  value={formData.tipo_documento}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, tipo_documento: value }))
                  }
                >
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
                <Input
                  id="numero_documento"
                  name="numero_documento"
                  placeholder="Número de documento"
                  value={formData.numero_documento}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="imagen">Imagen</Label>
                <Input
                  id="imagen"
                  name="imagen"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                />
                {preview && (
                  <img
                    src={preview}
                    alt="Vista previa"
                    className="mt-2 h-32 w-32 object-cover"
                  />
                )}
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
