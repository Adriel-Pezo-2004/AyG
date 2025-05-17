"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Users, Search, Pencil, Trash2 } from "lucide-react"
import Link from "next/link"
import { Input } from "@/components/ui/input"

export default function ClientesPage() {
  interface Cliente {
    id_contacto: number
    nombre: string
    genero: string
    celular: string
    documento: string
    nrodocumento: number
    correo?: string
    departamento: string
    provincia: string
    distrito: string
    urbanizacion?: string
    direccion?: string
    usuario_insertor?: string
  }

  const [clientes, setClientes] = useState<Cliente[]>([])

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const res = await fetch("/api/contactos")
        if (!res.ok) throw new Error("Error al cargar clientes")
        const data = await res.json()
        setClientes(data)
      } catch (error) {
        console.error("Error al obtener clientes:", error)
      }
    }

    fetchClientes()
  }, [])

  const handleDelete = async (id: number) => {
    try {
      const confirmDelete = window.confirm("¿Estás seguro de eliminar este cliente?")
      if (!confirmDelete) return

      const response = await fetch(`/api/contactos/${id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        setClientes(prev => prev.filter(c => c.id_contacto !== id))
      } else {
        const errorData = await response.json()
        throw new Error(errorData.error || "Error al eliminar")
      }
    } catch (error) {
      console.error("Error al eliminar:", error)
    }
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Clientes</h2>
        <div className="flex items-center space-x-2">
          <Button asChild>
            <Link href="/clientes/nuevo">
              <Users className="mr-2 h-4 w-4" />
              Nuevo Cliente
            </Link>
          </Button>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Gestión de Clientes</CardTitle>
          <CardDescription>
            Administre los clientes de la inmobiliaria. Puede agregar, editar o eliminar clientes.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between pb-4">
            <div className="relative w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Buscar cliente..." className="w-full pl-8" />
            </div>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Género</TableHead>
                <TableHead>Celular</TableHead>
                <TableHead>Documento</TableHead>
                <TableHead>N° Documento</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Departamento</TableHead>
                <TableHead>Provincia</TableHead>
                <TableHead>Distrito</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {clientes.map((cliente) => (
                <TableRow key={cliente.id_contacto}>
                  <TableCell className="font-medium">{cliente.nombre}</TableCell>
                  <TableCell>{cliente.genero}</TableCell>
                  <TableCell>{cliente.celular}</TableCell>
                  <TableCell>{cliente.documento}</TableCell>
                  <TableCell>{cliente.nrodocumento}</TableCell>
                  <TableCell>{cliente.correo || "-"}</TableCell>
                  <TableCell>{cliente.departamento}</TableCell>
                  <TableCell>{cliente.provincia}</TableCell>
                  <TableCell>{cliente.distrito}</TableCell>
                  <TableCell className="text-right space-x-1">
                    <Button variant="ghost" size="icon" asChild>
                      <Link href={`/clientes/editar/${cliente.id_contacto}`}>
                        <Pencil className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => handleDelete(cliente.id_contacto)}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}