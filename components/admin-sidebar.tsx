"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Building,
  Calendar,
  ClipboardList,
  FileText,
  LayoutDashboard,
  LogOut,
  Settings,
  Users,
  UserPlus,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
} from "@/components/ui/sidebar"
import { useEffect, useState } from "react"

// Función para obtener el user_id de la cookie
function getUserIdFromCookie(): string | null {
  if (typeof document === "undefined") return null
  const match = document.cookie.match(/(?:^|;\s*)user_id=([^;]*)/)
  return match ? decodeURIComponent(match[1]) : null
}


export function AdminSidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)
  const [usuario, setUsuario] = useState<{
    nombres: string
    apellidos: string
    usuario: string
    imagen?: string
  } | null>(null)

  useEffect(() => {
    const user_id = getUserIdFromCookie()
    if (!user_id) {
      setUsuario(null)
      return
    }
    const fetchUsuario = async () => {
      try {
        // Busca el asesor por user_id en la API de asesores
        const resAsesor = await fetch(`/api/asesores/${user_id}`, { credentials: "include" })
        if (resAsesor.ok) {
          const data = await resAsesor.json()
          setUsuario(data)
        } else {
          setUsuario(null)
        }
      } catch {
        setUsuario(null)
      }
    }
    fetchUsuario()
  }, [])

  const menuItems = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
      group: "principal",
    },
    {
      title: "Asesores",
      href: "/asesores",
      icon: UserPlus,
      group: "gestion",
    },
    {
      title: "Propiedades",
      href: "/propiedades",
      icon: Building,
      group: "gestion",
    },
    {
      title: "Clientes",
      href: "/clientes",
      icon: Users,
      group: "gestion",
    },
    {
      title: "Contratos",
      href: "/contratos",
      icon: FileText,
      group: "documentos",
    },
    {
      title: "Eventos",
      href: "/eventos",
      icon: Calendar,
      group: "agenda",
    },
    {
      title: "Agenda",
      href: "/agenda",
      icon: ClipboardList,
      group: "agenda",
    },
  ]

  // Preparar los datos del usuario para mostrarlos
  const nombreCompleto = usuario ? `${usuario.nombres} ${usuario.apellidos}` : "Inmobiliaria"
  const correo = usuario?.usuario || ""
  const rol = correo === "adriefape@gmail.com" ? "Administrador" : "Asesor"
  const foto =
    usuario?.imagen
      ? `data:image/jpeg;base64,${usuario.imagen}`
      : `https://ui-avatars.com/api/?name=${encodeURIComponent(nombreCompleto)}`


  return (
    <Sidebar>
      <SidebarHeader className="h-16 border-b border-sidebar-border flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <img
            src={foto}
            alt={nombreCompleto}
            className="h-8 w-8 rounded-full object-cover bg-amber-500 text-white font-bold"
          />
          {!collapsed && (
            <div className="flex flex-col">
              <span className="text-sm font-semibold">{nombreCompleto}</span>
              <span className="text-xs text-muted-foreground">{rol}</span>
            </div>
          )}
          <button
          type="button"
          aria-label={collapsed ? "Expandir sidebar" : "Contraer sidebar"}
          onClick={() => setCollapsed((v) => !v)}
          className="ml-2 rounded p-1 hover:bg-muted transition"
        >
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
        </div>
        
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Principal</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems
                .filter((item) => item.group === "principal")
                .map((item) => (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton asChild isActive={pathname === item.href}>
                      <Link href={item.href}>
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Gestión</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems
                .filter((item) => item.group === "gestion")
                .map((item) => (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton asChild isActive={pathname === item.href}>
                      <Link href={item.href}>
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Documentos</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems
                .filter((item) => item.group === "documentos")
                .map((item) => (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton asChild isActive={pathname === item.href}>
                      <Link href={item.href}>
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Agenda</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems
                .filter((item) => item.group === "agenda")
                .map((item) => (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton asChild isActive={pathname === item.href}>
                      <Link href={item.href}>
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/configuracion">
                <Settings className="h-4 w-4" />
                <span>Configuración</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/logout">
                <LogOut className="h-4 w-4" />
                <span>Cerrar sesión</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}