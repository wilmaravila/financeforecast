
 // Estado para mensajes de registro
 const register = async (nombres, apellidos, fechaNacimiento, email, password) => {
    const user = { nombres, apellidos, fechaNacimiento, email, password };  // Crea el objeto con los datos del usuario
  
    try {
      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });
  
      // Aquí comprobamos si la respuesta fue exitosa (código de estado 2xx)
      if (response.ok) {
        const data = await response.json();  // Convertimos la respuesta en JSON (si es necesario)
        console.log(data);  // Puedes hacer algo con la respuesta aquí si la necesitas
        return true;  // Si la respuesta es exitosa, retornamos true
      }
      
      return false;  // Si la respuesta no fue exitosa (código de estado fuera de 2xx), retornamos false
      
    } catch (error) {
      console.error('Error en el registro:', error);
      return false;  // Si hubo un error en la solicitud, retornamos false
    }
  };
  export default register;