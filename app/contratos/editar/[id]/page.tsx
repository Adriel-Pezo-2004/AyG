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
import { ArrowLeft, Save, Upload, FileText } from "lucide-react"
import Link from "next/link"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { cn } from "@/lib/utils"

export default function EditarContratoPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [contrato, setContrato] = useState({
    id: params.id,
    numero: "CONT-2024-001",
    tipo: "compraventa",
    propiedad: "1",
    cliente: "1",
    fechaInicio: new Date(2024, 3, 15),
    fechaFin: new Date(2024, 9, 15),
    monto: "250000",
    estado: "vigente",
    observaciones: "Contrato de compraventa para departamento en Cayma.",
    documento: "contrato_001.pdf",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulación de guardado
    setTimeout(() => {
      setIsLoading(false)
      router.push("/contratos")
    }, 1500)
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Editar Contrato</h2>
        <div className="flex items-center space-x-2">
          <Button variant="outline" asChild>
            <Link href="/contratos">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver
            </Link>
          </Button>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Información del Contrato</CardTitle>
          <CardDescription>Actualice los datos del contrato.</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="numero">Número de Contrato</Label>
                <Input
                  id="numero"
                  placeholder="CONT-2024-XXX"
                  value={contrato.numero}
                  onChange={(e) => setContrato({ ...contrato, numero: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tipo">Tipo de Contrato</Label>
                <Select value={contrato.tipo} onValueChange={(value) => setContrato({ ...contrato, tipo: value })}>
                  <SelectTrigger id="tipo">
                    <SelectValue placeholder="Seleccionar tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="compraventa">Compraventa</SelectItem>
                    <SelectItem value="alquiler">Alquiler</SelectItem>
                    <SelectItem value="exclusividad">Exclusividad</SelectItem>
                    <SelectItem value="otro">Otro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="propiedad">Propiedad</Label>
                <Select
                  value={contrato.propiedad}
                  onValueChange={(value) => setContrato({ ...contrato, propiedad: value })}
                >
                  <SelectTrigger id="propiedad">
                    <SelectValue placeholder="Seleccionar propiedad" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Av. Javier Prado 2340, San Isidro</SelectItem>
                    <SelectItem value="2">Jr. Salaverry 234, Miraflores</SelectItem>
                    <SelectItem value="3">Calle Los Pinos 567, La Molina</SelectItem>
                    <SelectItem value="4">Av. Arequipa 890, Lince</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="cliente">Cliente</Label>
                <Select
                  value={contrato.cliente}
                  onValueChange={(value) => setContrato({ ...contrato, cliente: value })}
                >
                  <SelectTrigger id="cliente">
                    <SelectValue placeholder="Seleccionar cliente" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Luis Ramírez</SelectItem>
                    <SelectItem value="2">Sofía Torres</SelectItem>
                    <SelectItem value="3">Miguel Ángel Castro</SelectItem>
                    <SelectItem value="4">Carmen Vega</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="fechaInicio">Fecha de Inicio</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !contrato.fechaInicio && "text-muted-foreground",
                      )}
                    >
                      {contrato.fechaInicio ? (
                        format(contrato.fechaInicio, "dd/MM/yyyy", { locale: es })
                      ) : (
                        <span>Seleccionar fecha</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={contrato.fechaInicio}
                      onSelect={(date) => date && setContrato({ ...contrato, fechaInicio: date })}
                      initialFocus
                      locale={es}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-2">
                <Label htmlFor="fechaFin">Fecha de Fin</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !contrato.fechaFin && "text-muted-foreground",
                      )}
                    >
                      {contrato.fechaFin ? (
                        format(contrato.fechaFin, "dd/MM/yyyy", { locale: es })
                      ) : (
                        <span>Seleccionar fecha</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={contrato.fechaFin}
                      onSelect={(date) => date && setContrato({ ...contrato, fechaFin: date })}
                      initialFocus
                      locale={es}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-2">
                <Label htmlFor="monto">Monto (S/)</Label>
                <Input
                  id="monto"
                  type="number"
                  placeholder="0.00"
                  value={contrato.monto}
                  onChange={(e) => setContrato({ ...contrato, monto: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="estado">Estado</Label>
                <Select value={contrato.estado} onValueChange={(value) => setContrato({ ...contrato, estado: value })}>
                  <SelectTrigger id="estado">
                    <SelectValue placeholder="Seleccionar estado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="vigente">Vigente</SelectItem>
                    <SelectItem value="finalizado">Finalizado</SelectItem>
                    <SelectItem value="pendiente">Pendiente</SelectItem>
                    <SelectItem value="cancelado">Cancelado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="observaciones">Observaciones</Label>
                <Textarea
                  id="observaciones"
                  placeholder="Observaciones adicionales"
                  value={contrato.observaciones}
                  onChange={(e) => setContrato({ ...contrato, observaciones: e.target.value })}
                />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label>Documento del Contrato</Label>
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center p-2 border rounded-md">
                    <FileText className="h-5 w-5 mr-2 text-muted-foreground" />
                    <span>{contrato.documento}</span>
                  </div>
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
                      <p className="text-xs text-gray-500">PDF, DOC, DOCX (MAX. 10MB)</p>
                    </div>
                    <input id="dropzone-file" type="file" className="hidden" />
                  </label>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" type="button" onClick={() => router.push("/contratos")}>
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
