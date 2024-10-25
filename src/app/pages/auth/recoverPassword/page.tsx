'use client'
import bankingImage from '../../../assets/images/Logo.png'
import Image from 'next/image'
import Input from "../../../utils/Input"
import { useState } from 'react'
import useAuth from '../../../api/controller';
 export default function recoverPassword(){

   const [email,setEmail] = useState(''); 
   const [isLoading, setIsLoading] = useState(false)
   const {recoverPassword} = useAuth();

   const handleChange =(e)=>{
    setEmail(e.target.value)
   }
   
  const handleButton = () => {
    console.log(email);
    recoverPassword(email);
    

  }
   
   
    return(
        <div>
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 p-4 ">
                <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden transform transition-all hover:scale-105 duration-300 ease-in-out">
                    <div className="p-8">
                        <div className="text-center mb-8 items-center flex flex-col">
           
                            <Image src={bankingImage} alt="logo FinanceForeCast" className="h-16 w-16 text-blue-500 mx-auto  " /> 
                            <h2 className="mt-4 text-3xl font-extrabold text-gray-900">FinanceForecasts</h2>
                            <p className="mt-2 text-sm text-gray-600">Recuperacion de contraseña</p>
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Correo electrónico
                            </label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                             <Input
                                    id='Correo'
                                    name="Correo"
                                    type="text"
                                    value={email}
                                    onChange={handleChange}
                                    required
                                    
                                    placeholder="juanito@ejemplo.com"
                                />
                            
                            </div>
                        </div>
                        <div className="pt-6">
                            <button
                                type="submit"
                                onClick={handleButton}
                                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 ease-in-out transform hover:scale-105"
                                disabled={isLoading}
                                
                            >
                                {isLoading ? (
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                ) : null}
                                {isLoading ? 'Enviando correo...' : 'Enviar correo'}
                            </button>
                        
                        </div>
                    </div>
                </div>
                
            </div>  





        </div>
    )

}