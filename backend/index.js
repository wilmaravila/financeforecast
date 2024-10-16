const express = require('express');
const cors = require('cors');

const app = express();
const port = 5000;

// Middlewarea
app.use(cors()); // Permitir CORS
app.use(express.json()); 



const mysql = require('mysql2');
const { Result } = require('postcss');

// Crear la conexión a la base de datos
const connection = mysql.createConnection({
  host: 'localhost', // Dirección de tu base de datos (o la URL en producción)
  user: 'root',      // Usuario de MySQL
  password: '',  // Contraseña de MySQL
  database: 'financeforecast'   // Nombre de la base de datos
});

// Conectar a la base de datos
connection.connect(function(error){

    if(error){
        throw error;
    }else{
        console.log('conexion exitosa')
    }


})
app.use(express.json());

app.get('/api/login', (req, res) => {
    const query = 'SELECT * FROM credenciales';
  
    connection.query(query, (error, results) => {
      if (error) {
        // Esto imprimirá el error en la consola
        return res.status(500).json({ error: 'Error en la consulta' }); // Responde con un error 500
      }
      res.json(results); // Devuelve los resultados como JSON
    });
  });

app.post('/api/register', (req, res) => {
    const { nombres, apellidos, fechaNacimiento, email, password } = req.body;

    if (!nombres || !apellidos || !fechaNacimiento || !email || !password) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }


    // Iniciar transacción
   

        // Paso 1: Insertar el nuevo usuario
    const queryUsuario = 'INSERT INTO usuarios (nombre, apellido, fecha_nacimiento) VALUES (?, ?, ?)';
    console.log(queryUsuario);
    connection.query(queryUsuario, [nombres, apellidos, fechaNacimiento], (err, result) => {
            if (err) {
                return connection.rollback(() => {
                    res.status(500).json({ error: 'Error al insertar el usuario' });
                });
            }

            const userId = result.insertId; // Obtener el ID del usuario insertado

            // Paso 2: Insertar las credenciales del usuario, utilizando el userId como foreign key
            const queryCredenciales = 'INSERT INTO credenciales ( correo, password,usuario_id) VALUES (?, ?, ?)';
            connection.query(queryCredenciales, [ email, password,userId], (err, result) => {
                if (err) {
                    return connection.rollback(() => {
                        res.status(500).json({ error: 'Error al insertar las credenciales' });
                    });
                }

                // Confirmar la transacción si todo fue exitoso
                connection.commit((err) => {
                    if (err) {
                        return connection.rollback(() => {
                            res.status(500).json({ error: 'Error al confirmar la transacción' });
                        });
                    }

                    res.status(201).json({ message: 'Usuario y credenciales creados con éxito' });
                });
            });
        });
    });
;
 
 
app.listen(port, () => {
        console.log(`Servidor escuchando en http://localhost:${port}`);
      });
