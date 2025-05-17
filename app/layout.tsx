"use client"

import type React from "react";
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/admin-sidebar";
import { ThemeProvider } from "@/components/theme-provider";
import { usePathname } from "next/navigation";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname();
  const hideSidebar = pathname === "/login" || pathname === "/logout";

  return (
    <html lang="es" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {hideSidebar ? (
            <main className="min-h-screen">{children}</main>
          ) : (
            <SidebarProvider>
              <AdminSidebar />
              <SidebarInset>
                <div className="flex h-16 items-center border-b px-4">
                  <SidebarTrigger className="mr-2" />
                </div>
                <main className="flex-1 overflow-auto p-4">{children}</main>
              </SidebarInset>
            </SidebarProvider>
          )}
        </ThemeProvider>
      </body>
    </html>
  );
}