'use client';  // Marca este archivo como componente del cliente
import Image from 'next/image';

import {useRouter} from 'next/navigation';
import Input from "../../../utils/InputCR"
import { useSearchParams  } from 'next/navigation';
import { useState, useEffect } from 'react';
import useAuth from '../../../Controllers/controller'
import bankingImage from '../../../assets/images/Logo.png'
const ResetPasswordPage = () => {
    const searchParams = useSearchParams();
 const token = searchParams.get('token')
  const   email  = searchParams.get('email')
  const [isLoading, setIsLoading] = useState(false)
  const [isValid, setIsValid] = useState(null);
  const [password, setPassword]= useState('');
  const [repitPassword, setRepitPassword] = useState('');
  const {resetPassword} = useAuth();
  const {changePassword} = useAuth();
  
  const Router = useRouter();
const handleChange =(e) =>{
 setPassword(e.target.value);
}
const handleChangeRepit =(e) =>{
  setRepitPassword(e.target.value)
}
const handleButton = ()=>{

  if(password === repitPassword){
    changePassword(password)
  }
  alert('Las contraseñas no coinciden');
}
const handleButtonReenvio=()=>{
  Router.push('../auth/recoverPassword')
}



  useEffect(() => {
    const validateToken = async () => {
      if (!token || !email) {
        setIsValid(false); // Faltan parámetros en la URL
        return;
      }

      const result = await resetPassword(token, email);
      console.log(result);
      setIsValid(result);
    };

    validateToken();
  }, [token, email]);
console.log(isValid)
if (isValid === null) {
  return (<div>Cargando...</div>);
}

if (!isValid) {
  return (
  
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 p-4 ">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden transform transition-all hover:scale-105 duration-300 ease-in-out">
        <div className="p-8">
          <div className="text-center mb-8 items-center flex flex-col">
           
            <Image src={bankingImage} alt="logo FinanceForeCast" className="h-16 w-16 text-blue-500 mx-auto  " /> 
            <h2 className="mt-4 text-3xl font-extrabold text-gray-900">FinanceForecasts</h2>
            <p className="mt-2 text-sm text-gray-600">Inicia sesión para acceder a tu cuenta</p>
          </div>
          <div className="pt-6">
              <button
                type="submit"
                onClick={handleButtonReenvio}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 ease-in-out transform hover:scale-105"
                disabled={isLoading}
                
              >
                {isLoading ? (
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : null}
                {isLoading ? 'Ingresando a recuperar contraseña' : 'Ir a crear un nuevo enlace de recuperacion'}
              </button>
              
            </div>

               
        </div>

</div>


</div> 
  );
}

return (
  <div>
     <div>
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 p-4 ">
                <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden transform transition-all hover:scale-105 duration-300 ease-in-out">
                    <div className="p-8">
                        <div className="text-center mb-8 items-center flex flex-col">
           
                            <Image src={bankingImage} alt="logo FinanceForeCast" className="h-16 w-16 text-blue-500 mx-auto  " /> 
                            <h2 className="mt-4 text-3xl font-extrabold text-gray-900">FinanceForecasts</h2>
                            <p className="mt-2 text-sm text-gray-600">Cambio de contraseña</p>
                        </div>
                        <div className="pt-3">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Contraseña
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  
                </div>
                <Input 
                id="password"
                name="password" 
                 required 
                placeholder=""
                value={password}
                onChange={handleChange}  />
              </div>
            </div>
            <div className="pt-3">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Repetir Contraseña
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  
                </div>
                <Input 
                id="passwordC" 
                name="passwordC" 
                required 
                placeholder="" 
                value={repitPassword}
                onChange={handleChangeRepit}
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
                                {isLoading ? 'Cambiando contraseña.....' : 'Cambiar contraseña'}
                            </button>
                        
                        </div>
                    </div>
                </div>
                
            </div>  





        </div>
  </div>
);
};


export default ResetPasswordPage;
