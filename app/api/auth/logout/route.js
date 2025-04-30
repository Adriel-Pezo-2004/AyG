// app/api/auth/logout/route.ts
import { NextResponse } from 'next/server'

export async function POST() {
  const response = NextResponse.json(
    { success: true },
    { status: 200 }
  )

  response.cookies.set({
    name: 'authToken',
    value: '',
    maxAge: -1 // Expira inmediatamente
  })

  return response
}