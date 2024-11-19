'use client'
import Image from "next/image"
import bankingImage from '../../../assets/images/Logo.png' 
import { useState } from "react";
import useAuth from '../../../Controllers/controller';
import { useRouter } from "next/navigation";



export default function cierre (){

    const [isLoading,setIsLoading] = useState();
    const router = useRouter();
const {cierreSession} = useAuth();
    const handleButtonCierre = async () => {
      const respuesta = await cierreSession();
      console.log(respuesta);
        if(respuesta){
            alert('Se a cerrado la sesion satisfactoriamente');
            router.push('/')

        }
      };



    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 p-4">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden">
            <div className="p-8">
              <div className="text-center mb-8 items-center flex flex-col">
                <Image src={bankingImage} alt="logo FinanceForecast" className="h-16 w-16 text-blue-500 mx-auto" />
                <h2 className="mt-4 text-3xl font-extrabold text-gray-900">FinanceForecasts</h2>
                <p className="mt-2 text-sm text-gray-600"></p>
              </div>
              <div className="pt-6">
                <button
                  type="submit"
                  onClick={handleButtonCierre}
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 ease-in-out transform hover:scale-105"
                  disabled={isLoading}
                  
                >
                  {isLoading ? (
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : null}
                  {isLoading ? 'Cerrando sesion' : 'Cerrar sesion'}
                </button>
                
              </div>
            </div>
          </div>
        </div>
      );
    }
