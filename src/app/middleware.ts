import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { parseCookies } from 'nookies'; // Usamos nookies para manejar las cookies

export function middleware(request: NextRequest) {
  // Leer la cookie con el token desde el objeto request
  const { access_token } = parseCookies({ req: request }); // Usamos 'access_token' como ejemplo, usa el nombre de tu cookie

  console.log('Middleware ejecutándose');
  console.log('Token encontrado:', access_token);

  // Si no se encuentra el token, redirigir al usuario a la página de login
  if (!access_token) {
    console.log('No se encontró el token, redirigiendo a /auth/login');
    return NextResponse.redirect(new URL('/auth/login', request.url)); // Cambia a la ruta de login que corresponda
  }

  // Si el token está presente, continuar con la solicitud
  console.log('Token encontrado, continuando con la solicitud');
  return NextResponse.next();
}

// Matcher: Define las rutas donde se aplica el middleware
export const config = {
  matcher: ['/banks*', '/finanzasPersonales', '/emuladorCdts'], // Rutas protegidas
};
