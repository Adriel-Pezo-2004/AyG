"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const router = useRouter()

  useEffect(() => {
    router.push("/dashboard") // Redirigir automáticamente al dashboard
  }, [router])

  return null
}