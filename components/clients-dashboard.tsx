import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, UserPlus, UserCheck, UserMinus } from "lucide-react"
import { DonutChart, LineChart } from "@/components/charts"

export function ClientsDashboard() {
  // Datos de ejemplo para los gráficos
  const clientTypeData = [
    { name: "Compradores", value: 40, color: "#f59e0b" },
    { name: "Vendedores", value: 35, color: "#10b981" },
    { name: "Arrendatarios", value: 15, color: "#3b82f6" },
    { name: "Arrendadores", value: 10, color: "#8b5cf6" },
  ]

  const clientGrowthData = [
    { name: "Ene", value: 20 },
    { name: "Feb", value: 25 },
    { name: "Mar", value: 30 },
    { name: "Abr", value: 28 },
    { name: "May", value: 33 },
    { name: "Jun", value: 35 },
    { name: "Jul", value: 40 },
    { name: "Ago", value: 45 },
    { name: "Sep", value: 50 },
    { name: "Oct", value: 55 },
    { name: "Nov", value: 60 },
    { name: "Dic", value: 65 },
  ]

  const clientSourceData = [
    { name: "Referidos", value: 40, color: "#f59e0b" },
    { name: "Sitio Web", value: 25, color: "#10b981" },
    { name: "Redes Sociales", value: 20, color: "#3b82f6" },
    { name: "Publicidad", value: 15, color: "#8b5cf6" },
  ]

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Clientes</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">100</div>
            <p className="text-xs text-muted-foreground">+15% desde el mes pasado</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Nuevos Clientes</CardTitle>
            <UserPlus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15</div>
            <p className="text-xs text-muted-foreground">Este mes</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Clientes Activos</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">75</div>
            <p className="text-xs text-muted-foreground">75% del total</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Clientes Inactivos</CardTitle>
            <UserMinus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">25</div>
            <p className="text-xs text-muted-foreground">25% del total</p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Clientes por Tipo</CardTitle>
            <CardDescription>Distribución de clientes según su tipo</CardDescription>
          </CardHeader>
          <CardContent>
            <DonutChart data={clientTypeData} />
          </CardContent>
        </Card>
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Crecimiento de Clientes</CardTitle>
            <CardDescription>Evolución mensual de clientes</CardDescription>
          </CardHeader>
          <CardContent>
            <LineChart data={clientGrowthData} />
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Origen de Clientes</CardTitle>
          <CardDescription>Distribución de clientes según su origen</CardDescription>
        </CardHeader>
        <CardContent>
          <DonutChart data={clientSourceData} />
        </CardContent>
      </Card>
    </div>
  )
}
