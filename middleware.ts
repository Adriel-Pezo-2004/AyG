import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const userId = request.cookies.get("user_id")?.value;

  // Si no está autenticado y no está en /login, redirige a /login
  if (!userId && pathname !== "/login") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Si está autenticado y va a la raíz o a /login, redirige a /dashboard
  if (userId && (pathname === "/" || pathname === "/login")) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

// Aplica el middleware solo a rutas relevantes
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};