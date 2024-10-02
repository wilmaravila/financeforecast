import React from 'react';
import Image from 'next/image'; // Si usas Next.js

// Imagenes locales o desde public
import bankingImage from '../assets/images/Logo.png';

export default function busqueda (){

  return( 
    <header className="flex items-center justify-between p-4 bg-white shadow-md">
    <a href="/" className="flex items-center space-x-2">
    <Image src={bankingImage} alt="FinanceForecast Logo" width={40} height={40} />
    <span className="text-xl font-bold text-blue-600">FinanceForecast</span>
    </a>
    <nav className="flex items-center space-x-4">
    <a href="/" className="text-sm font-medium text-gray-600 hover:text-blue-600">Home</a>
    <a href="/finanzas-personales" className="text-sm font-semibold text-black ">Finanzas Personales</a>
    <a href="/bancos" className="text-sm font-medium text-gray-600 hover:text-blue-600">Bancos</a>
    <a href='./login'><button className="border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-4 py-1 rounded">Login</button></a>
    </nav>
    </header>
    ) 
}