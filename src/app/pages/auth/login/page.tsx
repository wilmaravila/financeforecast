'use client'
import { ChangeEvent,useState } from "react"

import axios from 'axios';
import Cookies from 'js-cookie';
import Image from "next/image"
import bankingImage from '../../../assets/images/Logo.png' 
import InputC from "../../../utils/InputC"
import useAuth from '../../../Controllers/controller';
import { useRouter } from 'next/navigation';
import Input from "../../../utils/Input"
import Button from "./Button"










export default function LoginForm() {
 


  const {login} =useAuth();
  const router = useRouter(); 
  const handleGoogleSignIn = () => {
    console.log("Button clicked!");
  };
 
  const [isLoading, setIsLoading] = useState(false)

  const[userCorreo,setUserCorreo] = useState('');
  const[pass,setPass] = useState('')
  
  function handleChange(e) {
    setUserCorreo(e.target.value);
  }
  function handlePasswordChange(e){
    setPass(e.target.value);

  }
  const handleSutmid = async (e: React.FormEvent) => {
    e.preventDefault();
        
    const esta = login(userCorreo,pass);
     console.log(esta);
     esta.then((value) => {
      if(value){
        // router.push('../finanzasPersonales');
  
      }else{
        alert('El usuario o la contraseña son incorrectos')
      }
  })

  //   try {
  //     const esta = await login(userCorreo, pass); // 'login' debe devolver una Promesa.
  //     if (esta) {
  //       const response = await axios.post('/api/auth/login', { email: userCorreo, password: pass });
  //       Cookies.set('authToken', response.data.token, {
  //         expires: 7, // Token dura 7 días
  //         secure: true,
  //         sameSite: 'Strict',
  //       });
  //       router.push('/finanzasPersonales');
  //     } else {
  //       alert('El usuario o la contraseña son incorrectos');
  //     }
  //   } catch (error) {
  //     console.error('Error durante el inicio de sesión:', error);
  //     alert('Error al iniciar sesión, revisa tus datos.');
  //   }
  // };
  }

  const handleButton =  async() => {


};
     
   
    
    // Aquí puedes añadir la lógica de inicio de sesión
 
  




  

  // Saber si esta en la base de datos
  

  
 
 
  

   
  

  

  return (
   <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 p-4 ">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden transform transition-all hover:scale-105 duration-300 ease-in-out">
        <div className="p-8">
          <div className="text-center mb-8 items-center flex flex-col">
           
            <Image src={bankingImage} alt="logo FinanceForeCast" className="h-16 w-16 text-blue-500 mx-auto  " /> 
            <h2 className="mt-4 text-3xl font-extrabold text-gray-900">FinanceForecasts</h2>
            <p className="mt-2 text-sm text-gray-600">Inicia sesión para acceder a tu cuenta</p>
          </div>
          <Button onClick={handleGoogleSignIn} className="w-full mb-4 bg-white text-gray-700 border border-gray-300 hover:bg-gray-100">
            
            
          </Button>
            
            
          
          <div className="relative my-2">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-300"></span>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>
            <form id="from" name="form" onSubmit={handleSutmid} >
              <div>
                <label id="email" className="block text-sm font-medium text-gray-700">
                  Correo electrónico
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    
                  </div>
                  <Input
                id='Correo'
                name="Correo"
                type="text"
                value={userCorreo}
                onChange={handleChange}
                required
                
                placeholder="juanito@ejemplo.com"
              />
                  
                </div>
              </div>

              <div className="pt-3">
                <label id="password" className="block text-sm font-medium text-gray-700">
                  Contraseña
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    
                  </div>
                      <InputC
                    id="password"
                    name="password"
                    type="password"
                    value={pass}
                    onChange={handlePasswordChange}
                    required
                    className="pl-10 block w-full"
                    placeholder="******"
                    />
                </div>
              </div>
            
            <div className="flex items-center justify-between pt-3">
              <div className="flex items-center">
                <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                <label id="remember-me" className="ml-2 block text-sm text-gray-900">
                  Recordarme
                </label>
              </div>
              <div className="text-sm">
                <a href="./recoverPassword" className="font-medium text-blue-600 hover:text-blue-500">
                  ¿Olvidaste tu contraseña?
                </a>
              </div>
            </div>

            <div className="pt-6">
              <button
                type="submit"
                
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 ease-in-out transform hover:scale-105"
                disabled={isLoading}
                onClick={handleButton}
                
              >
                {isLoading ? (
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : null}
                {isLoading ? 'Iniciando sesión...' : 'Iniciar sesión'}
              </button>
              
            </div>
           </form> 
          
            
            <div className="px-8 py-4 bg-gray-50 border-t border-gray-100 text-center">
              <p className="text-sm text-gray-600">
                ¿No tienes una cuenta?{' '}
                <a href="./register" className="font-medium text-blue-600 hover:text-blue-500">
                  Regístrate ahora
                </a>
              </p>
            </div>

         
          
        </div>

      </div>


   </div> 
  )
}
