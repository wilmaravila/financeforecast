import { useState, useEffect } from 'react';

function useAuth() {
  const [usuarios, setUsuarios] = useState([]);  // Estado para almacenar usuarios
  const [error, setError] = useState(null);  // Estado para almacenar errores
  const [message, setMessage] = useState('');  // Estado para mensajes de registro

  // useEffect para obtener usuarios al cargar el componente
  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/login');  // Asegúrate de que la URL sea correcta
        if (!response.ok) {
          throw new Error('Error al obtener los datos');
        }
        const data = await response.json();
        setUsuarios(data);  // Establece los usuarios en el estado
      } catch (error) {
        setError(error.message);  // Establece el error en el estado
      }
    };

    fetchUsuarios();
  }, []);  // Asegúrate de pasar un array vacío para que solo se ejecute una vez

  // Función para login
  const login = (userCorreo, password) => {
    for (let user of usuarios) {
      if (user.correo === userCorreo && user.password === password) {
        return true;  // Si el usuario y contraseña coinciden, retorna verdadero
      }
    }
    return false;  // Si no coincide, retorna falso
  };

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

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        setMessage(data.message);  // Establece el mensaje de éxito
      } else {
        setMessage(data.error);  // Establece el mensaje de error
      }
    } catch (error) {
      setMessage('Error al registrar usuario');
    }
  };

  return { login, error, register, message };  // Devuelve las funciones y los estados necesarios
}

export default useAuth;
