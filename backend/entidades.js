// URL de la API externa
const cron = require('node-cron');

// Función para obtener datos de la API externa y enviarlos a tu servidor
async function obtenerYEnviarDatos() {
  try {
    
        const url = 'https://magicloops.dev/api/loop/run/3d1a638c-beeb-4c85-80c9-eb03f5e3a148';
        const response = await axios.post(url, { input: "I love Magic Loops!" });
        const responseJson = response.data;
    
        console.log('Datos obtenidos de la API:', responseJson);
    
        // Extraer el array de certificados_deposito_termino
        const certificados = responseJson.loopOutput.certificados_deposito_termino;
        console.log(certificados);
    

        // 3. Enviar los datos a tu servidor para que los inserte en la base de datos
        const servidorUrl = 'http://localhost:5000/api/entidades'; // Cambia esto si tu servidor está en otro puerto
        const postResponse = await fetch(servidorUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(certificados) // Convertir los datos a JSON
        });

        const postResponseJson = await postResponse.json();
        if (postResponse.ok) {
        console.log('Datos agregados correctamente:', postResponseJson);
        } else {
        console.error('Error al agregar los datos:', postResponseJson);
        }

  } catch (error) {
    console.error('Error al obtener o enviar los datos:', error);
  }
}

cron.schedule('0 3 1 * *', () => {
    console.log('Ejecutando tarea programada...');
    obtenerYEnviarDatos();
  });
// Llamar a la función para ejecutar todo el proceso

