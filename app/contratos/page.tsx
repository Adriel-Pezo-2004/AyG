import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Download, Mail, Eye, FileText } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export default function ContratosPage() {
  const contratos = [
    {
      id: "1",
      numero: "CONT-2024-001",
      propiedad: "Av. Javier Prado 2340, San Isidro",
      cliente: "Luis Ramírez",
      tipo: "Compraventa",
      fechaEmision: "15/04/2024",
      estado: "Vigente",
    },
    {
      id: "2",
      numero: "CONT-2024-002",
      propiedad: "Jr. Salaverry 234, Miraflores",
      cliente: "Sofía Torres",
      tipo: "Alquiler",
      fechaEmision: "10/04/2024",
      estado: "Vigente",
    },
    {
      id: "3",
      numero: "CONT-2024-003",
      propiedad: "Calle Los Pinos 567, La Molina",
      cliente: "Miguel Ángel Castro",
      tipo: "Compraventa",
      fechaEmision: "05/04/2024",
      estado: "Finalizado",
    },
    {
      id: "4",
      numero: "CONT-2024-004",
      propiedad: "Av. Arequipa 890, Lince",
      cliente: "Carmen Vega",
      tipo: "Alquiler",
      fechaEmision: "01/04/2024",
      estado: "Vigente",
    },
    {
      id: "5",
      numero: "CONT-2024-005",
      propiedad: "Calle Schell 452, Miraflores",
      cliente: "Jorge Mendoza",
      tipo: "Compraventa",
      fechaEmision: "25/03/2024",
      estado: "Pendiente",
    },
  ]

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Contratos</h2>
        <div className="flex items-center space-x-2">
          <Button asChild>
            <Link href="/contratos/nuevo">
              <FileText className="mr-2 h-4 w-4" />
              Nuevo Contrato
            </Link>
          </Button>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Gestión de Contratos</CardTitle>
          <CardDescription>Visualice, descargue y envíe los contratos generados.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between pb-4">
            <div className="relative w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Buscar contrato..." className="w-full pl-8" />
            </div>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Número</TableHead>
                <TableHead>Propiedad</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Fecha Emisión</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {contratos.map((contrato) => (
                <TableRow key={contrato.id}>
                  <TableCell className="font-medium">{contrato.numero}</TableCell>
                  <TableCell>{contrato.propiedad}</TableCell>
                  <TableCell>{contrato.cliente}</TableCell>
                  <TableCell>{contrato.tipo}</TableCell>
                  <TableCell>{contrato.fechaEmision}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        contrato.estado === "Vigente"
                          ? "default"
                          : contrato.estado === "Finalizado"
                            ? "secondary"
                            : "outline"
                      }
                    >
                      {contrato.estado}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" asChild>
                      <Link href={`/contratos/editar/${contrato.id}`}>
                        <Eye className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Mail className="h-4 w-4" />
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
