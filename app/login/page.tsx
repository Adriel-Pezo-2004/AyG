"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

export default function LoginPage() {
  const router = useRouter()
  const [form, setForm] = useState({ usuario: "", password: "" })
  const [error, setError] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.id]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
      credentials: "include", // <-- Esto es clave
    })
    if (res.ok) {
      router.push("/dashboard")
    } else {
      setError("Usuario o contraseña incorrectos")
    }
  }

  return (
    <div
      className={cn(
        "h-screen flex items-center justify-center",
        "bg-muted"
      )}
    >
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl text-center font-semibold">
            Iniciar Sesión
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="usuario" className="text-sm font-medium block">
                Usuario
              </Label>
              <Input
                id="usuario"
                type="text"
                value={form.usuario}
                onChange={handleChange}
                required
                autoFocus
                placeholder="Ingrese su usuario"
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium block">
                Contraseña
              </Label>
              <Input
                id="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                required
                placeholder="Ingrese su contraseña"
                className="w-full"
              />
            </div>
            {error && (
              <div className="text-red-600 text-sm mt-2">
                {error}
              </div>
            )}
            <Button type="submit" className="w-full">
              Ingresar
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}