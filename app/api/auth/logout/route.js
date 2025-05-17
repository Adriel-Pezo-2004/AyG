import { NextResponse } from 'next/server'

export async function POST() {
  const response = NextResponse.json(
    { success: true },
    { status: 200 }
  )

  response.cookies.set({
    name: 'user_id', 
    value: '',
    maxAge: -1,
    path: "/"
  })

  return response
}