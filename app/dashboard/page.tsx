"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Building, Users, FileText, Calendar } from "lucide-react"
import { Overview } from "@/components/overview"
import { RecentProperties } from "@/components/recent-properties"
import { DateFilter } from "@/components/date-filter"
import { LocationFilter } from "@/components/location-filter"
import { PropertiesDashboard } from "@/components/properties-dashboard"
import { ClientsDashboard } from "@/components/clients-dashboard"
import { ContractsDashboard } from "@/components/contracts-dashboard"

export default function DashboardPage() {
  const [dateFilter, setDateFilter] = useState({ type: "month" })
  const [locationFilter, setLocationFilter] = useState({
    region: "arequipa",
    province: "all",
    district: "all",
  })

  const handleDateFilterChange = (filter: { type: string; dates?: Date[] }) => {
    setDateFilter(filter)
    console.log("Date filter changed:", filter)
  }

  const handleLocationFilterChange = (filter: { region: string; province: string; district: string }) => {
    setLocationFilter(filter)
    console.log("Location filter changed:", filter)
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      </div>

      <div className="flex flex-col md:flex-row justify-between gap-4">
        <DateFilter onFilterChange={handleDateFilterChange} />
        <LocationFilter onFilterChange={handleLocationFilterChange} />
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="propiedades">Propiedades</TabsTrigger>
          <TabsTrigger value="clientes">Clientes</TabsTrigger>
          <TabsTrigger value="contratos">Contratos</TabsTrigger>
        </TabsList>
        <TabsContent value="general" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Propiedades</CardTitle>
                <Building className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">45</div>
                <p className="text-xs text-muted-foreground">+2 desde el mes pasado</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Clientes</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">35</div>
                <p className="text-xs text-muted-foreground">+5 desde el mes pasado</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Contratos Activos</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">28</div>
                <p className="text-xs text-muted-foreground">+3 desde el mes pasado</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Eventos Próximos</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">Para los próximos 30 días</p>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Vista mensual de operaciones</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <Overview />
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Propiedades Recientes</CardTitle>
                <CardDescription>Últimas propiedades registradas</CardDescription>
              </CardHeader>
              <CardContent>
                <RecentProperties />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="propiedades">
          <PropertiesDashboard />
        </TabsContent>
        <TabsContent value="clientes">
          <ClientsDashboard />
        </TabsContent>
        <TabsContent value="contratos">
          <ContractsDashboard />
        </TabsContent>
      </Tabs>
    </div>
  )
}
