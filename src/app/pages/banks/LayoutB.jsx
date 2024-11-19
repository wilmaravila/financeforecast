'use client'
import React from 'react';
import Image from 'next/image'; // Si usas Next.js

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import useAuth from '../../Controllers/controller'
//import bankingIdmage from '../finanzasPersonales';
// Imagenes locales o desde public
import bankingImage from '../../assets/images/Logo.png';

export default function busqueda (){

  const {getCookie} =useAuth();
  const [isLoading,setIsLoading] = useState('')
  const [location, setLocation] = useState('')

  const router = useRouter();
  useEffect(() =>  {
    // Leer la cookie 'token' al carconst token = Cookies.get('token');
    
    const validar =async ()=>{
    const token = await getCookie();
  console.log(token);
    if (!token) {
      // Si no hay token, redirigir al login
      setIsLoading('Login');
      setLocation('../auth/login') 
    }else{
    setIsLoading('Sign out');
    setLocation('../auth/cierreSession');
  }
}
  validar();
}, );

  return( 
    <header className="flex items-center justify-between p-4 bg-white shadow-md">
    <a href="/" className="flex items-center space-x-2">
    <Image src={bankingImage} alt="FinanceForecast Logo" className='w-16 h-16'  />
    <span className="text-xl font-bold text-blue-600">FinanceForecast</span>
    </a>
    <nav className="flex items-center space-x-4">
    <a href="../../" className="text-sm font-medium text-gray-600 hover:text-blue-600">Home</a>
    <a href="../pages/finanzasPersonales" className="text-sm font-medium text-gray-600 hover:text-blue-600">Finanzas Personales</a>
    <a href="/" className="text-sm font-semibold text-black">Bancos</a>
    <a href={location}><button className="border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-4 py-1 rounded">{isLoading}</button></a>
    </nav>
    </header>
    ) 
}