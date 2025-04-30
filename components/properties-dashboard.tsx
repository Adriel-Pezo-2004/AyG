import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Building, Home, Store, Warehouse } from "lucide-react"
import { DonutChart, BarChart } from "@/components/charts"

export function PropertiesDashboard() {
  // Datos de ejemplo para los gráficos
  const propertyTypeData = [
    { name: "Departamentos", value: 35, color: "#f59e0b" },
    { name: "Casas", value: 25, color: "#10b981" },
    { name: "Locales Comerciales", value: 15, color: "#3b82f6" },
    { name: "Terrenos", value: 10, color: "#8b5cf6" },
    { name: "Oficinas", value: 15, color: "#ec4899" },
  ]

  const propertyStatusData = [
    { name: "Disponible", value: 45 },
    { name: "Alquilado", value: 20 },
    { name: "Vendido", value: 15 },
    { name: "En Proceso", value: 10 },
  ]

  const propertyByDistrictData = [
    { name: "Cayma", value: 12 },
    { name: "Yanahuara", value: 10 },
    { name: "Cerro Colorado", value: 8 },
    { name: "José L.B. y Rivero", value: 7 },
    { name: "Arequipa", value: 6 },
    { name: "Sachaca", value: 5 },
    { name: "Miraflores", value: 4 },
    { name: "Otros", value: 8 },
  ]

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Departamentos</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">35</div>
            <p className="text-xs text-muted-foreground">40% del total</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Casas</CardTitle>
            <Home className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">25</div>
            <p className="text-xs text-muted-foreground">30% del total</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Locales Comerciales</CardTitle>
            <Store className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15</div>
            <p className="text-xs text-muted-foreground">15% del total</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Otros</CardTitle>
            <Warehouse className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15</div>
            <p className="text-xs text-muted-foreground">15% del total</p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Propiedades por Tipo</CardTitle>
            <CardDescription>Distribución de propiedades según su tipo</CardDescription>
          </CardHeader>
          <CardContent>
            <DonutChart data={propertyTypeData} />
          </CardContent>
        </Card>
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Propiedades por Distrito</CardTitle>
            <CardDescription>Distribución de propiedades por distrito</CardDescription>
          </CardHeader>
          <CardContent>
            <BarChart data={propertyByDistrictData} />
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Estado de Propiedades</CardTitle>
          <CardDescription>Distribución de propiedades según su estado actual</CardDescription>
        </CardHeader>
        <CardContent>
          <BarChart data={propertyStatusData} horizontal />
        </CardContent>
      </Card>
    </div>
  )
}
