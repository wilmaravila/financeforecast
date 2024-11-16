import React from 'react';

export default function financeAi() {
  return (
    <div style={{ margin: 0, padding: 0, height: '100vh', width: '100vw' }}>
      {/* Aquí cargamos el archivo HTML dentro del iframe */}
      <iframe
        src="/FinanceAi.html" // Ruta relativa al archivo HTML en la carpeta public
        width="100%"
        height="100%"
        style={{ border: 'none', position: 'absolute', top: 0, left: 0 }}
        title="Mi archivo HTML"
      ></iframe>
    </div>
  );
}