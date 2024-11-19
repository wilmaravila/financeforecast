'use client'

import logo from '../../../assets/images/Logo.png'
import Image from 'next/image'

import { useState } from 'react'


export default function enviar(){

    const [isLoading,setIsLoading]= useState();
   const handleButtonLogin =()=>{

    window.location.href = '../auth/login'

   }
    return(
        <div>
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 p-4 ">
            <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden transform transition-all hover:scale-105 duration-300 ease-in-out">
                <div className="p-8">
                <div className="text-center mb-8 items-center flex flex-col">
                    
                    <Image src={logo} alt="logo FinanceForeCast" className="h-16 w-16 text-blue-500 mx-auto  " /> 
                    <h2 className="mt-4 text-3xl font-extrabold text-gray-900">FinanceForecasts</h2>
                    <p className="mt-2 text-sm text-gray-600">Corrreo enviado</p>
                </div>
                        <button
                            type="submit"
                            onClick={handleButtonLogin}
                            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 ease-in-out transform hover:scale-105"
                            disabled={isLoading}
                            
                        >
                            {isLoading ? (
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            ) : null}
                            {isLoading ? 'Iniciando sesión' : 'Iniciar sesion'}
                        </button>
                    
                    </div>
                </div>
            </div>
            
        </div>  


                        )
}