import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, CheckCircle, Clock, AlertCircle } from "lucide-react"
import { DonutChart, BarChart, LineChart } from "@/components/charts"

export function ContractsDashboard() {
  // Datos de ejemplo para los gráficos
  const contractTypeData = [
    { name: "Compraventa", value: 45, color: "#f59e0b" },
    { name: "Alquiler", value: 35, color: "#10b981" },
    { name: "Exclusividad", value: 15, color: "#3b82f6" },
    { name: "Otros", value: 5, color: "#8b5cf6" },
  ]

  const contractStatusData = [
    { name: "Vigentes", value: 55 },
    { name: "Finalizados", value: 30 },
    { name: "Pendientes", value: 10 },
    { name: "Cancelados", value: 5 },
  ]

  const contractMonthlyData = [
    { name: "Ene", value: 8 },
    { name: "Feb", value: 10 },
    { name: "Mar", value: 12 },
    { name: "Abr", value: 9 },
    { name: "May", value: 11 },
    { name: "Jun", value: 14 },
    { name: "Jul", value: 16 },
    { name: "Ago", value: 13 },
    { name: "Sep", value: 15 },
    { name: "Oct", value: 18 },
    { name: "Nov", value: 20 },
    { name: "Dic", value: 17 },
  ]

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Contratos</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">100</div>
            <p className="text-xs text-muted-foreground">+10% desde el mes pasado</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Contratos Vigentes</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">55</div>
            <p className="text-xs text-muted-foreground">55% del total</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Contratos Pendientes</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">10</div>
            <p className="text-xs text-muted-foreground">10% del total</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Contratos por Vencer</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">Próximos 30 días</p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Contratos por Tipo</CardTitle>
            <CardDescription>Distribución de contratos según su tipo</CardDescription>
          </CardHeader>
          <CardContent>
            <DonutChart data={contractTypeData} />
          </CardContent>
        </Card>
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Contratos Mensuales</CardTitle>
            <CardDescription>Evolución mensual de contratos</CardDescription>
          </CardHeader>
          <CardContent>
            <LineChart data={contractMonthlyData} />
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Estado de Contratos</CardTitle>
          <CardDescription>Distribución de contratos según su estado actual</CardDescription>
        </CardHeader>
        <CardContent>
          <BarChart data={contractStatusData} horizontal />
        </CardContent>
      </Card>
    </div>
  )
}
