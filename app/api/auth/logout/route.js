import { NextResponse } from 'next/server'

export async function POST() {
  const response = NextResponse.json(
    { success: true },
    { status: 200 }
  )

  response.cookies.set('user_id', '', {
    httpOnly: true,
    path: '/',
    maxAge: 0,
    sameSite: 'lax',
  })

  return response
}