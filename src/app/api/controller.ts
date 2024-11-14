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
        });
       
        // Verificar si la respuesta fue exitosa
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Error en la autenticación');
        }

        const data = await response.ok;
        if(data == true){
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


 
    

  // Función para registrar un nuevo usuario
  const register = async (nombres,apellidos,fechaNacimiento, email, password) => {
    const user = { nombres,apellidos,fechaNacimiento, email, password };  // Crea el objeto con los datos del usuario

    try {
      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      const data = await response;
      console.log(data);

      
    } catch (error) {
      setMessage('Error al registrar usuario');
    }
  };

  // obtiene datos proporcionados por el usuario para enviar una validacion
  const recoverPassword = async(email)=>{

    
    try{
      const response = await fetch('http://localhost:5000/api/recoverPassword',{

        method: 'POST',
        headers:{ 'Content-Type': 'application/json'},
        body: JSON.stringify({email})
      })
      return response.json();

    }catch(error){

    }


  }
  const resetPassword = async(email)=>{

    try{
      const response = await fetch('http://localhost:5000/api/resetPassword',{

        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })

      });
      return response.json();
   

    }catch(error){
      setMessage('Error al recuperar password')
    }
  }

  return { login, error, register, message,recoverPassword };  // Devuelve las funciones y los estados necesarios
}

export default useAuth;
