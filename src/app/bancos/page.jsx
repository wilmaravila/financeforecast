import React from 'react';
import Image from 'next/image'; // Si usas Next.js

// Imagenes locales o desde public
import Navegar from '../LayoutB'
import business from '../assets/images/business.jpg'
import bankingImage from '../assets/images/Logo.png'; // Coloca tu imagen aquí
import cdtIcon from '../assets/images/imagenPrueba.jpg';
import interestIcon from '../assets/images/istockphoto-1317323736-612x612.jpg';
import feeIcon from '../assets/images/gratisography-cyber-kitty-800x525.jpg';



export default function HomePage() {
  return (
    
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <Navegar/>

      {/* Main Section */}
      <main className="container mx-auto px-4 py-8">
        <section className="mb-12 ">
          <div className=" flex md:flex-row items-center justify-between  rounded-lg overflow-hidden">

            <div className=" flex flex-col p-8   relative w-1/3 text-center items-center ">
              <h1 className="text-3xl font-bold mb-4">APIs Bancarias</h1>
              <p className="mb-6">Toda la información de las diferentes entidades bancarias tales como tasas de interés, CDTs y más, de una forma segura en una misma sección.</p>
             <a> <button className="bg-blue-500 text-white px-0 py-2  w-36 rounded-2xl	 ">Empezar Aquí</button></a>
            </div>
            <div className="p-4">
              <Image src={business} alt="Banking APIs" width={400} height={250} className="rounded-lg" />
            </div>
          </div>
        </section>

        {/* Tarjetas de Información */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <Image src={cdtIcon} alt="CDT Icon" width={60} height={60} className="mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">Los Mejores CDTs</h3>
            <p className="text-gray-600 mb-4">Consulta los CDTs más rentables y asegúrate de obtener el mayor beneficio para tu inversión.</p>
          
            <a href="/"> <button className="bg-blue-500 text-white px-0 py-2  w-36 rounded-2xl	 ">Ver más</button></a>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <Image src={interestIcon} alt="Interest Icon" width={60} height={60} className="mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">Las Tasas de Interés Más Bajas</h3>
            <p className="text-gray-600 mb-4">Compara las tasas de interés de los diferentes bancos y selecciona la mejor opción para tus préstamos.</p>
            <a href="/"> <button className="bg-blue-500 text-white px-0 py-2  w-36 rounded-2xl	 ">Ver más</button></a>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <Image src={feeIcon} alt="Fee Icon" width={60} height={60} className="mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">Cuotas de Manejo</h3>
            <p className="text-gray-600 mb-4">Descubre las entidades bancarias con las cuotas de manejo más bajas para cuentas de ahorro y tarjetas.</p>
            <a href="/"> <button className="bg-blue-500 text-white px-0 py-2  w-36 rounded-2xl	 ">Ver más</button></a>
          </div>
        </section>
      </main>

   
  
    </div>
   
  );
}
