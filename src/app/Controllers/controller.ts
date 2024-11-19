import { json } from 'node:stream/consumers';
import { useState, useEffect } from 'react';

function useAuth() {
  const [usuarios, setUsuarios] = useState([]);  // Estado para almacenar usuarios
  const [error, setError] = useState(null);  // Estado para almacenar errores
  const [message, setMessage] = useState('');  // Estado para mensajes de registro

  // useEffect para obtener usuarios al cargar el componente
  // Asegúrate de pasar un array vacío para que solo se ejecute una vez

  // Función para login
 
  const login = async (email, password) => {
    const user = { email, password };
    try {
        const response = await fetch('http://localhost:5000/api/login', {
          
            method: 'POST', // Cambiar a POST
            headers: {
                'Content-Type': 'application/json', // Establecer el tipo de contenido
            },
            
            body: JSON.stringify(user),
            credentials: 'include',
            
        });
       
        // Verificar si la respuesta fue exitosa
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Error en la autenticación');
         
        }

        const data = await response;
        
        console.log(data)
        if(data.ok){
          return true;
        }else{
          return false;
        }
        
         // Retornar los datos de la respuesta
    } catch (error) {
        setError(error.message);  // Establecer el error en el estado
    }
};

 // Asegúrate de pasar un array vacío para que solo se ejecute una vez

  // Función para login

const DateTable = async() =>{
  try{

    const response = await fetch('http://localhost:5000/api/dateCdts', {
      method: 'GET',
     
    });
    
    if (!response.ok) {
      console.error('Error fetching data:', response.statusText);
      return; // Handle the error or return if the fetch fails
    }
    
    const data = await response.json(); // Assuming the response is in JSON format
    console.log(data); // You can log the response data to see its contents
    
    return data;


  }catch(error){

  }
}
 
    const calcularGanancia =(ctd, inversion,tiempo) =>{
      let porcentaje = parseFloat(ctd.replace('%', '')) / 100;
      const resultado = inversion*(porcentaje *tiempo +1);
      const resultadoRedondeado = Math.round(resultado * 100) / 100;

    console.log(`El cdt es ${ctd}, inversión: ${inversion}, tiempo: ${tiempo}, ganancia: ${resultadoRedondeado}`);
    return resultadoRedondeado;
    }

  // Función para registrar un nuevo usuario
  
  // obtiene datos proporcionados por el usuario para enviar una validacion
  const recoverPassword = async(email)=>{

    
    try{
      const response = await fetch('http://localhost:5000/api/recoverPassword',{

        method: 'POST',
        
        headers:{ 'Content-Type': 'application/json'},
        body: JSON.stringify({email})
      })
      console.log(response)
      return response.ok;
      

    }catch(error){

    }


  }

  const resetPassword = async (token, email) => {
    try {
      const response = await fetch('http://localhost:5000/api/validation_token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, email }),
      });
  
      const data = await response.json(); // Convertir la respuesta en formato JSON
      console.log(data); // Para depuración, ver qué devuelve el servidor
  
      if (response.ok) { // Verifica si la respuesta fue exitosa
        if (data.valid) {
          return true; // Token válido
        } else {
          console.log(data.message); // Mostrar el mensaje si el token no es válido
          return false;
        }
      } else {
        // Si la respuesta no fue exitosa
        return { valid: false, message: 'Error en la validación del token' };
      }
    } catch (error) {
      console.error('Error al validar el token:', error);
      return { valid: false, message: 'Hubo un error en la validación del token' };
    }
  };

  // cambio de password
  const changePassword = async(email,password)=>{
    const user = { email, password };
    try {
        const response = await fetch('http://localhost:5000/api/ingreso_password', {
            method: 'POST', // Cambiar a POST
            headers: {
                'Content-Type': 'application/json', // Establecer el tipo de contenido
            },
            body: JSON.stringify(user),
            
        });
       
        // Verificar si la respuesta fue exitosa
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Error en la autenticación');
        }

        const data = await response.ok;
        console.log(data)
          return data;
        
         // Retornar los datos de la respuesta
    } catch (error) {
        setError(error.message);  // Establecer el error en el estado
    }
  }
  const cierreSession = async() =>{
    const response = await fetch('http://localhost:5000/api/logout', {
      method: 'POST', // Cambiar a POST
      credentials: 'include',
      headers: {
          'Content-Type': 'application/json', // Establecer el tipo de contenido
      },
    })
    const respuesta = await response.json();
    return respuesta;

  }
  const getCookie = async ()=>{
    const response = await  fetch('http://localhost:5000/api/getCookie', {
    method: 'GET', // Cambiar a POST
    credentials: 'include',
    headers: {
        'Content-Type': 'application/json', // Establecer el tipo de contenido
    },

  })
  console.log(response)
  const valor = response;
  console.log(valor);
  return response.ok;
}
  
  

  return { login, error, message,recoverPassword,resetPassword,changePassword,DateTable,calcularGanancia,cierreSession,getCookie };  // Devuelve las funciones y los estados necesarios
}

export default useAuth;
