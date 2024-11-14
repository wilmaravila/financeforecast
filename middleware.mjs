import { NextResponse } from "next/server";

export function middleware(req) {
  // Genera un nonce único
  const nonce = crypto.randomUUID(); // Alternativamente, usa un método de generación de nonces seguro

  // Configura el encabezado CSP con el nonce generado
  const res = NextResponse.next();
  res.headers.set(
    "Content-Security-Policy",
    `script-src 'self' 'nonce-${nonce}';`
  );

  // Guarda el nonce para que esté disponible en la aplicación
  res.cookies.set("nonce", nonce);

  return res;
}
