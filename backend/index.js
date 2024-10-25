const express = require('express');
const cors = require('cors');
require('dotenv').config();
const bcrypt = require('bcrypt');
const sendEmail = require('./utils/sendEmail')


const app = express();
const port = 5000;

// Middlewarea
app.use(cors()); // Permitir CORS
app.use(express.json()); 



const mysql = require('mysql2/promise');
const { Result } = require('postcss');
const { error } = require('console');
const { Html } = require('next/document');

// Crear la conexión a la base de datos
const connection = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME   // Nombre de la base de datos
});

// Conectar a la base de datos

app.use(express.json());

app.post('/api/login', async(req, res) => {
   
  
    const { email, password } = req.body;
    console.log(email);
    console.log(password);

    // Validación de campos
    if (!email || !password) {
        return res.status(400).json({ error: 'Correo y contraseña son obligatorios' });
    }

    let connectionR;

    try {
        // Obtener una conexión desde el pool
        connectionR = await connection.getConnection();

        // Buscar el usuario por correo
        const querybusqueda = 'SELECT * FROM credenciales WHERE correo = ?';
        const [rows] = await connectionR.query(querybusqueda, [email]);
        console.log(rows);
        if (rows.length === 0) {
            // Si no encontramos el correo, el usuario no existe
            return res.status(400).json({ error: 'Credenciales incorrectas' });
        }

        const user = rows[0];

        // Comparar la contraseña ingresada con la encriptada
        const isMatch = await bcrypt.compare(password, user.password);
        console.log(isMatch);

        if (!isMatch) {
            // Si la contraseña no coincide
            return res.status(400).json({ error: 'Credenciales incorrectas',success:false });
        }

        // Si la contraseña es correcta, continuar con el proceso de autenticación
        res.status(200).json({ message: 'Inicio de sesión exitoso', success: true });
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        res.status(500).json({ error: 'Error en la operación' });
    } finally {
        if (connectionR) connectionR.release(); // Asegurar la liberación de la conexión
    }
});

//registra persona

app.post('/api/register', async(req, res) => {
    const { nombres, apellidos, fechaNacimiento, email, password } = req.body;

    // Validación de campos
    if (!nombres || !apellidos || !fechaNacimiento || !email || !password) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    let connectionR;

    try {
        // Obtener una conexión desde el pool
        connectionR = await connection.getConnection();

        // Verificar si el correo ya existe
        const querybusqueda = 'SELECT * FROM credenciales WHERE correo = ?';
        const [rows] = await connectionR.query(querybusqueda, [email]); // Usamos await aquí

        if (rows.length > 0) {
            // El usuario ya existe, retornamos un mensaje
            return res.status(400).json({ message: 'El usuario ya existe' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        // Iniciar la transacción
        await connectionR.beginTransaction();

        // Insertar el usuario
        const queryUsuario = 'INSERT INTO usuarios (nombre, apellido, fecha_nacimiento) VALUES (?, ?, ?)';
        const [resultUsuario] = await connectionR.query(queryUsuario, [nombres, apellidos, fechaNacimiento]);

        // Obtener el ID del usuario insertado
        const userId = resultUsuario.insertId;

        // Insertar las credenciales del usuario, utilizando el userId como foreign key
        const queryCredenciales = 'INSERT INTO credenciales (correo, password, usuario_id) VALUES (?, ?, ?)';
        await connectionR.query(queryCredenciales, [email, hashedPassword, userId]);

        // Confirmar la transacción si todo fue exitoso
        await connectionR.commit();
        
       return res.status(201).json({ message: 'Usuario agregado exitosamente' });
    } catch (error) {
        if (connectionR) await connectionR.rollback(); // Si hay un error, hacemos rollback
        console.error('Error al agregar el usuario:', error);
        res.status(500).json({ error: 'Error en la operación' });
    } finally {
        if (connectionR) connectionR.release(); // Asegurar la liberación de la conexión
    }
});
//recuperar cuenta
app.post('/api/recoverPassword',async(req,res)=>{

    const {email} =req.body;
    console.log(email);
    let connectionS
    try{
        connectionS = await connection.getConnection();
        const querybusqueda = 'SELECT * FROM credenciales WHERE correo=?';
        const [rows] = await connectionS.query(querybusqueda,[email]);
        console.log(rows);
        if (rows.length === 0) {
            return res.status(400).json({ message: 'El usuario ingresado no existe' });
        }
    
        const idU = rows[0].usuario_id; 
        console.log(idU)
        const queryUsuario = 'SELECT * FROM usuarios WHERE id_usuario=?';
        console.log(queryUsuario);
        const [userRows] = await connectionS.query(queryUsuario, [idU]);
        console.log(userRows);
        if (userRows.length === 0) {
            return res.status(400).json({ message: 'Usuario no encontrado.' });
        }
    
        const data = userRows[0];
        console.log(data);
        console.log(rows);
        ;
        const subject="Recuperación de tu contraseña en FinanceForecast";
        const body ="Hola"+" " + data.nombre+" "+data.apellido+",\nHemos recibido una solicitud para restablecer tu contraseña en FinanceForecast. Si no solicitaste este cambio, puedes ignorar este correo con tranquilidad.\nPara restablecer tu contraseña, por favor, sigue el enlace a continuación:\n"+{ Html:'<button>Recuperar contraseña</button>'}+"\nEste enlace estará disponible por 30 minutos. Si el enlace ha caducado, puedes volver a solicitar un nuevo enlace desde nuestra plataforma.\nSi tienes alguna duda o problema, no dudes en ponerte en contacto con nuestro equipo de soporte.\nSaludos,\nEl equipo de FinanceForecast\n"+process.env.EMAIL;
        try {
            await sendEmail(email, subject, body);
            return res.status(200).json({ message: 'Correo de recuperación enviado' });
        } catch (sendError) {
            console.error('Error al enviar el correo:', sendError);
            return res.status(500).json({ message: 'Error al enviar el correo de recuperación' });
        }

    }catch{

    }



})

 
 
app.listen(port, () => {
        console.log(`Servidor escuchando en http://localhost:${port}`);
      });