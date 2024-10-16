import React from 'react';
import Image from 'next/image'; // Si usas Next.js
import Button from './Button';
// Imagenes locales o desde public
import Navegar from './utils/LayoutInicio'




export default function HomePage() {
  return (
    
    <div className="flex flex-col min-h-screen">
     
      <Navegar/>

     
      <main className="container mx-auto px-4 py-8">
       {/* Contenido de la pagina  donde da la explicacion de esta misma*/ }
       <h1 className='flex justify-center	font-mono text-2xl font-bold	'>Bienvenidos a Finaceforecast</h1>

       <p className='pt-20 text-36 '>Donde aprender sobre finanzas Y podras aprender a tener mente financiera para que puedas tener ganancias aparte de lo que ganas poder mover tu dinero, guardar debajo de tu colchon ya no sirve la economia avanza y tienes que avanzar con ella.</p>
       <div className='flex justify-center'> 
          <a href="./register"><button className='mt-20 flex justify-center items-center rounded w-36 h-8 bg-teal-400	'>Aprender más</button></a>
        </div> 
      
      </main>

   
  
    </div>
   
  );
}
