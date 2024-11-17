
'use client'
import { useState,FormEvent } from "react"
import register from '../../../Controllers/registerController';
import { useRouter } from 'next/navigation';
import Image from "next/image"
import bankingImage from '../../../assets/images/Logo.png' 
import Input from "../../../utils/Input"
import Button from "../login/Button"
import InputC from "../../../utils/InputCR"
import { promises } from "dns";






export default function LoginForm() {


  const handleGoogleSignIn = () => {
    // Implement Google Sign-In logic here
    console.log('Signing in with Google')
  }
  const router = useRouter(); 
  const [isLoading, setIsLoading] = useState(false)
  const [password,setPassword] = useState('')
  const [formData, setFormData] = useState({
    
    nombre: "",
    apellidos:"",
    dateNacimiento:"", 
    email: "",
    password: "",
    passwordC:""
  });
  console.log(formData);

  // Manejar los cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setFormData({
      ...formData,
      [name]: value,
      
    });
    
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    
    console.log("Datos del formulario: ", formData);
    // Aquí puedes enviar los datos a tu backend o hacer alguna otra acción
  }
  const handleButton = async(e) =>{
    console.log(formData);
    if(formData.password == formData.passwordC){
      if(formData != null &&   formData.nombre !=""&& formData.apellidos !=""&& formData.dateNacimiento !=""&& formData.email !="" ){

       let  respuesta = await  register(formData.nombre,formData.apellidos,formData.dateNacimiento,formData.email,formData.password)
        console.log(respuesta);

        if (respuesta) {
          alert("El usuario ha sido registrado exitosamente.");
          router.push('../finanzasPersonales');
        } else {
          alert("Hubo un problema al registrar el usuario.");
        }
      }else{
        alert('por favor ingresar todos los datos solicitados');
      };
        


      }else{alert('claves no coiciden');
    } 

  }


  
  

  return (
   <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 p-4 ">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden transform transition-all hover:scale-105 duration-300 ease-in-out">
        <div className="p-8">
          <div className="text-center mb-8 items-center flex ">
            <div className="h-16 w-16">  
                <Image src={bankingImage} alt="logo financeforecast"className="h-16 w-16 text-blue-500 mx-auto  " /> 
            </div> 
            <div>
                <h2 className="mt-4 text-3xl font-extrabold text-gray-900">FinanceForecasts</h2> 
                <p className="mt-2 text-sm text-gray-600 ">Registarse</p>
            </div>
          </div>
          <Button 
            onClick={handleGoogleSignIn}
            className="w-full mb-4 bg-white text-gray-700 border border-gray-300 hover:bg-gray-100"
          >
            
          </Button>
          <div className="relative my-2">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-300"></span>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>
        <form onSubmit={handleSubmit}>
          <div>
              <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">
                Nombres
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  
                </div>
                <Input 
                id="nombre" 
                name="nombre" 
                type="text" required  
                placeholder="Andres Felipe"
                value={formData.nombre}
                onChange={handleChange} 
                />
                
              </div>
            </div>

          <div className="pt-3">
              <label htmlFor="apellidos" className="block text-sm font-medium text-gray-700">
                Apellidos
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  
                </div>
                <Input 
                id="apellidos" 
                name="apellidos" 
                type="text" 
                required  
                placeholder="Hernandez Carrera"
                value={formData.apellidos}
                onChange={handleChange}
                 />
                
              </div>
            </div>
            <div className="pt-3">
              <label htmlFor="fecha" className="block text-sm font-medium text-gray-700">
                Fecha de Nacimiento
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  
                </div>
                <Input id="dateNacimiento"
                 name="dateNacimiento" 
                 type="date" 
                 required 
                 placeholder=""
                 value={formData.dateNacimiento}
                 onChange={handleChange}
                   />
                
              </div>
            </div>

            <div className="pt-3">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Correo electrónico
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  
                </div>
                <Input 
                id="email" 
                name="email" 
                type="email" 
                required  
                placeholder="juanito@ejemplo.com"
                value={formData.email}
                onChange={handleChange}
                 />
                
              </div>
            </div>

            <div className="pt-3">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Contraseña
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  
                </div>
                <InputC 
                id="password"
                name="password" 
                 required 
                placeholder=""
                value={formData.password}
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
                <InputC 
                id="passwordC" 
                name="passwordC" 
                required 
                placeholder="" 
                value={formData.passwordC}
                onChange={handleChange}
                   />
              </div>
            </div>
        </form>
          

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
                {isLoading ? 'Registrando...' : 'Registar'}
              </button>
            </div>
          
            
            <div className="px-8 py-4 bg-gray-50 border-t border-gray-100 text-center">
              <p className="text-sm text-gray-600">
                ¿Si ya tienes cuenta?{' '}
                <a href="./login" className="font-medium text-blue-600 hover:text-blue-500">
                  Inicia Sesión
                </a>
              </p>
            </div>


          
        </div>

      </div>


   </div> 
  )
}