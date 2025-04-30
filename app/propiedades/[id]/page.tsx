"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"

export default function DetallesPropiedadPage() {
  const params = useParams()
  interface Propiedad {
    titulo: string
    descripcion: string
    direccion: string
    tipo: string
    estado: string
    asesor: string
  }

  const [propiedad, setPropiedad] = useState<Propiedad | null>(null)
  
  useEffect(() => {
    const fetchPropiedad = async () => {
      try {
        const res = await fetch(`/api/propiedades/${params.id}`)
        if (!res.ok) throw new Error("Error al cargar propiedad")
        const data = await res.json()
        setPropiedad(data)
      } catch (error) {
        console.error("Error al obtener propiedad:", error)
      }
    }

    fetchPropiedad()
  }, [params.id])

  if (!propiedad) return <p>Cargando...</p>

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">{propiedad.titulo}</h1>
      <p>{propiedad.descripcion}</p>
      <h2 className="text-xl font-bold mt-4">Detalles</h2>
      <ul>
        <li>Dirección: {propiedad.direccion}</li>
        <li>Tipo: {propiedad.tipo}</li>
        <li>Estado: {propiedad.estado}</li>
        <li>Asesor: {propiedad.asesor}</li>
      </ul>
    </div>
  )
}