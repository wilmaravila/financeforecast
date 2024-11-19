import { NextResponse } from 'next/server';
import { parseCookies } from 'nookies'; // Usamos nookies para manejar las cookies
import jwt from 'jsonwebtoken'; // Para verificar el JWT

export function middleware(request) {
  const cookies = parseCookies({ req: request });
  const token = cookies.token; // Asegúrate de que el nombre de la cookie sea 'token'

  console.log('Middleware ejecutándose');
  console.log('Token encontrado:', token);

  if (!token) {
    console.log('No se encontró el token, redirigiendo a /auth/login');
    return NextResponse.redirect(new URL('/auth/login', request.url)); // Ruta de login
  }

  // Verifica el token (si está presente)
  try {
    const decoded = jwt.verify(token, process.env.SECRET_JWT_KEY); // Verifica el token usando la clave secreta
    console.log('Token válido, usuario:', decoded); // Opcional, para ver los datos del token
  } catch (error) {
    console.log('Token inválido, redirigiendo a /auth/login');
    return NextResponse.redirect(new URL('/auth/login', request.url)); // Redirige a login si el token no es válido
  }

  // Continuar con la solicitud si el token es válido
  return NextResponse.next();
}

// Configura las rutas que serán protegidas por el middleware
export const config = {
  matcher: ['/banks*', '/finanzasPersonales*', '/emuladorCdts*'], // Agrega más rutas según sea necesario
};

