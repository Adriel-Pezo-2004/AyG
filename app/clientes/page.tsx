import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Users, Search, Pencil, Trash2, FileDown } from "lucide-react"
import Link from "next/link"

export default function ClientesPage() {
  const clientes = [
    {
      id: "1",
      nombre: "Luis Ramírez",
      email: "luis.ramirez@gmail.com",
      telefono: "+51 987 654 321",
      tipo: "Comprador",
      fechaRegistro: "15/04/2024",
    },
    {
      id: "2",
      nombre: "Sofía Torres",
      email: "sofia.torres@gmail.com",
      telefono: "+51 987 123 456",
      tipo: "Vendedor",
      fechaRegistro: "10/04/2024",
    },
    {
      id: "3",
      nombre: "Miguel Ángel Castro",
      email: "miguel.castro@gmail.com",
      telefono: "+51 999 888 777",
      tipo: "Arrendatario",
      fechaRegistro: "05/04/2024",
    },
    {
      id: "4",
      nombre: "Carmen Vega",
      email: "carmen.vega@gmail.com",
      telefono: "+51 955 444 333",
      tipo: "Arrendador",
      fechaRegistro: "01/04/2024",
    },
    {
      id: "5",
      nombre: "Jorge Mendoza",
      email: "jorge.mendoza@gmail.com",
      telefono: "+51 933 222 111",
      tipo: "Comprador",
      fechaRegistro: "25/03/2024",
    },
  ]

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
          <Button variant="outline">
            <FileDown className="mr-2 h-4 w-4" />
            Exportar PDF
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
                <TableHead>Email</TableHead>
                <TableHead>Teléfono</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Fecha Registro</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {clientes.map((cliente) => (
                <TableRow key={cliente.id}>
                  <TableCell className="font-medium">{cliente.nombre}</TableCell>
                  <TableCell>{cliente.email}</TableCell>
                  <TableCell>{cliente.telefono}</TableCell>
                  <TableCell>{cliente.tipo}</TableCell>
                  <TableCell>{cliente.fechaRegistro}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" asChild>
                      <Link href={`/clientes/editar/${cliente.id}`}>
                        <Pencil className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Trash2 className="h-4 w-4" />
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
