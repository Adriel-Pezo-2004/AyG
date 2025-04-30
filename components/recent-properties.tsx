import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export function RecentProperties() {
  const properties = [
    {
      id: "1",
      address: "Av. Javier Prado 2340, San Isidro",
      type: "Departamento",
      advisor: "Carlos Mendoza",
      advisorInitials: "CM",
      date: "15/04/2024",
      status: "Disponible",
    },
    {
      id: "2",
      address: "Jr. Salaverry 234, Miraflores",
      type: "Casa",
      advisor: "María López",
      advisorInitials: "ML",
      date: "10/04/2024",
      status: "Alquilado",
    },
    {
      id: "3",
      address: "Calle Los Pinos 567, La Molina",
      type: "Departamento",
      advisor: "Juan Pérez",
      advisorInitials: "JP",
      date: "05/04/2024",
      status: "Vendido",
    },
    {
      id: "4",
      address: "Av. Arequipa 890, Lince",
      type: "Local Comercial",
      advisor: "Ana García",
      advisorInitials: "AG",
      date: "01/04/2024",
      status: "Disponible",
    },
  ]

  return (
    <div className="space-y-8">
      {properties.map((property) => (
        <div key={property.id} className="flex items-center">
          <Avatar className="h-9 w-9 mr-3">
            <AvatarFallback>{property.advisorInitials}</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <p className="text-sm font-medium leading-none">{property.address}</p>
            <div className="flex items-center gap-2">
              <p className="text-xs text-muted-foreground">{property.type}</p>
              <p className="text-xs text-muted-foreground">•</p>
              <p className="text-xs text-muted-foreground">{property.advisor}</p>
            </div>
          </div>
          <div className="ml-auto flex flex-col items-end">
            <Badge
              variant={
                property.status === "Disponible" ? "default" : property.status === "Alquilado" ? "secondary" : "outline"
              }
              className="ml-auto"
            >
              {property.status}
            </Badge>
            <p className="text-xs text-muted-foreground mt-1">{property.date}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
