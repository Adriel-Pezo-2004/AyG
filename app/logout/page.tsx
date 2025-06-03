"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function LogoutPage() {
  const router = useRouter()

  useEffect(() => {
    const logout = async () => {
      await fetch("/api/auth/logout", { method: "POST" })
      setTimeout(() => router.replace("/login"), 100) // pequeño delay
    }
    logout()
  }, [router])

  return (
    <div className="flex items-center justify-center min-h-screen">
      <span className="text-lg">Cerrando sesión...</span>
    </div>
  )
}