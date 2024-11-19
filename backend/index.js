const express = require('express');

require('dotenv').config();
const bcrypt = require('bcrypt');
const transporter = require('./utils/sendEmail')
const axios = require('axios');
const crypto = require('crypto'); 
const app = express();
const port = 5000;
const  jwt = require('jsonwebtoken');
const cors = require('cors');
const cookieParser = require('cookie-parser');

// Middlewarea

app.use(express.json()); 



const mysql = require('mysql2/promise');
const path = require('path');
const { redirect } = require('next/dist/server/api-utils');
const { validate } = require('node-cron');




// Crear la conexión a la base de datos
const connection = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME   // Nombre de la base de datos
});

// Conectar a la base de datos
app.use(cors({
  origin: 'http://localhost:3000', // Cambia esto a la dirección exacta de tu frontend
  credentials: true,                // Permitir cookies y encabezados con credenciales
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
  allowedHeaders: ['Content-Type', 'Authorization'], // Encabezados permitidos
}));

app.options('*', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000'); // Asegúrate de que coincida con el origen
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.status(204).end();
});
app.use(express.json());
app.use(cookieParser());

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  console.log(email)
 console.log(password)
  if (!email || !password) {
      return res.status(400).json({ error: 'Correo y contraseña son obligatorios' });
  }

  let connectionR;

  try {
      connectionR = await connection.getConnection();

      // Buscar el usuario por correo
      const querybusqueda = 'SELECT * FROM credenciales WHERE correo = ?';
      const [rows] = await connectionR.query(querybusqueda, [email]);

      if (rows.length === 0) {
          return res.status(400).json({ error: 'Credenciales incorrectas' });
      }

      const userDB = rows[0];
     console.log(userDB)
      const isMatch = await bcrypt.compare(password, userDB.password);
      console.log(isMatch)

      if (!isMatch) {
          return res.status(400).json({ error: 'Credenciales incorrectas', success: false });
      }

      // Configuración de la cookie
      const token = jwt.sign({ email: userDB.correo }, process.env.SECRET_JWT_KEY, {
          expiresIn: '1d',
      });

      res.cookie('token', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          maxAge: 24 * 60 * 60 * 1000, // 1 día
      });

      // Envía la respuesta una sola vez
      res.status(200).json({ success: true, message: 'Inicio de sesión exitoso' });
  } catch (error) {
      console.error('Error al iniciar sesión:', error);
      res.status(500).json({ error: 'Error en la operación' });
  } finally {
      if (connectionR) connectionR.release();
  }
});


//registra persona
app.get('/api/dateCdts', async (req, res) => {
  const query = 'SELECT * FROM entidades_bancarias WHERE fecha_agregado = (SELECT MAX(fecha_agregado) FROM entidades_bancarias);'
  
  try {
    const conn = await connection.getConnection();
    const [respuesta] = await conn.query(query);
    
    console.log(respuesta);
    // Enviar la respuesta como JSON
    return res.json(respuesta); // o res.send(respuesta) dependiendo de tu preferencia
    
  } catch (error) {
    console.error('Error al ejecutar la consulta:', error);
    return res.status(500).json({ error: 'Error al obtener los datos' });
  } 
});


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
        // Configuración de la cookie
      const token = jwt.sign({ email: email  }, process.env.SECRET_JWT_KEY, {
        expiresIn: '1d',
    });

    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 24 * 60 * 60 * 1000, // 1 día
    });
        
       return res.status(200).json({ message: 'Usuario agregado exitosamente' });
    } catch (error) {
        if (connectionR) await connectionR.rollback(); // Si hay un error, hacemos rollback
        console.error('Error al agregar el usuario:', error);
        res.status(500).json({ error: 'Error en la operación' });
    } finally {
        if (connectionR) connectionR.release(); // Asegurar la liberación de la conexión
    }
});
//recuperar cuenta
function generateResetToken() {
    return crypto.randomBytes(32).toString('hex');  // Genera un token único de 64 caracteres
}




app.post('/api/recoverPassword',async(req,res)=>{
    let token =generateResetToken();
    const expiration = 30 * 60 * 1000;
    const expirationTime = new Date(Date.now() + expiration);
    const {email} =req.body;
    conect =await connection.getConnection();
    const query = 'UPDATE credenciales SET token = ?, token_expires = ? WHERE correo = ?';
    conect.query(query,[token,expirationTime,email])
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
        
        const queryUsuario = 'SELECT * FROM usuarios WHERE id_usuario=?';
        
        const [userRows] = await connectionS.query(queryUsuario, [idU]);
        
        if (userRows.length === 0) {
            return res.status(400).json({ message: 'Usuario no encontrado.' });
        }
    
        const data = userRows[0];
        
        ;
        const enlace = `http://localhost:3000/pages/auth/resetPassword?token=${token}&email=${encodeURIComponent(email)}`;
         
       
        try {
            await transporter.sendMail({
                from: process.env.EMAIL, // sender address
                to: email, // list of receivers
                subject: "Recuperación de contraseña en FinanceForecast", // Subject line
                html:  `<b>Hola ${data.nombre} ${data.apellido}, </b> <br/> <br/>
                <b>Hemos recibido una solicitud para restablecer tu contraseña en FinanceForecast. Si no realizaste esta solicitud, puedes ignorar este correo de manera segura.</b> <br/> <br/>
                Para restablecer tu contraseña, por favor haz clic en el siguiente enlace: <br/> <br/>
                <a href="${enlace}"><button style="  border: none; color: white;  padding: 14px 28px; cursor: pointer;  border-radius: 5px; background-color: #007bff; transition: box-shadow 0.3s ease-in-out;">Dar click para ir a recuperar contraseña</buton></a><br/> <br/>

                <b> Este enlace estará disponible durante los próximos 30 minutos. Si expira, puedes solicitar uno nuevo directamente desde nuestra plataforma. <br/> <br/>
               Si tienes alguna pregunta o necesitas ayuda, no dudes en contactar a nuestro equipo de soporte escribiendo a ${process.env.EMAIL}
               <br/> <br/>
               Atentamente, <br/>
El equipo de FinanceForecast
               </b>`
            });
            return res.status(200).json({ message: 'Correo de recuperación enviado' });
        } catch (sendError) {
            console.error('Error al enviar el correo:', sendError);
            return res.status(500).json({ message: 'Error al enviar el correo de recuperación' })
        }

    }catch{

    } finally {
      if (connectionS) {connectionS.release();} // Asegurar la liberación de la conexión
  }
})

    




      
async function fetchDataAndSave() {
  const connectionS = await connection.getConnection();  
  try {
      const url = 'https://magicloops.dev/api/loop/run/3d1a638c-beeb-4c85-80c9-eb03f5e3a148';
      const response = await axios.post(url, { input: "I love Magic Loops!" });
      const responseJson = response.data;
  
      console.log('Datos obtenidos de la API:', responseJson);
     
  
      // Extraer el array de certificados_deposito_termino
      const certificados = responseJson.loopOutput.certificados_deposito_termino;
  
      // Insertar los datos en la base de datos
      certificados.forEach(certificado => {
        const query = `
          INSERT INTO entidades_bancarias (
            entidad,
            dias_30, dias_31_44, dias_45, dias_46_59, dias_60, dias_61_89, dias_90, 
            dias_91_119, dias_120, dias_121_179, dias_180, dias_181_359, dias_360, 
            superior_360
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
  
        // Obtener las tasas de interés de cada banco
        const valores = [
          certificado.entidad,
          certificado.emisiones_puntuales["30_dias"],
          certificado.emisiones_puntuales["31_44_dias"],
          certificado.emisiones_puntuales["45_dias"],
          certificado.emisiones_puntuales["46_59_dias"],
          certificado.emisiones_puntuales["60_dias"],
          certificado.emisiones_puntuales["61_89_dias"],
          certificado.emisiones_puntuales["90_dias"],
          certificado.emisiones_puntuales["91_119_dias"],
          certificado.emisiones_puntuales["120_dias"],
          certificado.emisiones_puntuales["121_179_dias"],
          certificado.emisiones_puntuales["180_dias"],
          certificado.emisiones_puntuales["181_359_dias"],
          certificado.emisiones_puntuales["360_dias"],
          certificado.emisiones_puntuales["superior_360_dias"]
        ];
  
        // Ejecutar la consulta para insertar los datos en la base de datos
        connectionS.query(query, valores, (err, results) => {
          if (err) {
            console.error('Error al guardar los datos:', err);
          } else {
            console.log('Datos guardados para la entidad:', certificado.entidad);
          }
        });
      });
  
    } catch (error) {
      console.error('Error al consumir la API:', error.message);
    } finally {
      if (connectionS) {connectionS.release();} // Asegurar la liberación de la conexión
  }
  }
  
  // Endpoint para ejecutar la tarea manualmente
  app.get('/api/ejecutar_tarea', async(req, res) => {
    fetchDataAndSave();
    res.send('Tarea ejecutada manualmente');
  });


  app.post('/api/validation_token', async (req, res) => {
    const { token, email } = req.body; // Asegurarse de que los datos llegan en el cuerpo (req.body)
    console.log(`This is email: ${email}`);
    console.log(`this is token ${token}`);
    const connectionR = await connection.getConnection();
    try {
      
    
      // Consulta a la base de datos
      const [tokenRecord] = await connectionR.query(
        'SELECT * FROM credenciales WHERE correo = ?', 
        [email]
      );
  
      console.log(tokenRecord);
  
      if (tokenRecord.length > 0) {
        const tokenData = tokenRecord[0];
        console.log(tokenData);
  
        const currentTime = Date.now();
        console.log(`Este es el tiempo de ahora ${currentTime}`);
  
        // Verifica si el token ha expirado
        const data = new Date(tokenData.token_expires).getTime();
        console.log(data);
        const tokenValidar = tokenData.token;
        console.log(tokenValidar);
        if (token != tokenValidar)
        {
          return res.json({ valid: false, message: 'El token es invalido' });
        }
        if (currentTime > data) {
          return res.json({ valid: false, message: 'El enlace ha expirado' });
        }
  
        // Token válido
        return res.json({ valid: true,message: 'si paso' });
      } else {
        // Token no encontrado
        return res.json({ valid: false, message: 'Token no válioo' });
      }
    } catch (error) {
      console.error('Error al validar el token:', error);
      return res.status(500).json({ valid: false, message: 'Error interno del servidor' });
    }finally {
      if (connectionR) {
        connectionR.release();
      }// Asegurar la liberación de la conexión
  }
  });

  app.post('/api/ingreso_password',async(req,res)=>{

    const { email, password } = req.body;

    console.log('Correo:', email);
    console.log('Contraseña:', password);
  
    // Validación de campos
    if (!email || !password) {
      return res.status(400).json({ valid: false, message: 'Correo y contraseña son obligatorios' });
    }
  
    let conn;
    try {
      conn = await connection.getConnection();
  
      const hashedPassword = await bcrypt.hash(password, 10);
      // Consulta para actualizar la contraseña
      const query = 'UPDATE credenciales SET password = ? WHERE correo = ?';
      const [result] = await conn.query(query, [hashedPassword, email]);
  
      // Verificar si la actualización afectó alguna fila
      if (result.affectedRows === 0) {
        return res.status(404).json({ valid: false, message: 'Usuario no encontrado o datos incorrectos' });
      }
  
      console.log('Contraseña actualizada exitosamente');
      return res.json({ valid: true, message: 'Contraseña cambiada exitosamente' });
    } catch (error) {
      console.error('Error al actualizar la contraseña:', error);
      return res.status(500).json({ valid: false, message: 'Error al cambiar la contraseña' });
    } finally {
      // Liberar la conexión
      if (conn) {
        conn.release();
      }
    }
  });
app.get('/api/cookieSee',async(req,res)=>{
        res.cookie('prueba','estaEsmiCookie')
        res.send('hello this cookie')

      })
app.post('/api/logout', (req, res) => {
        // Eliminar la cookie 'token' configurando su fecha de expiración a una pasada
        const cookies = req.cookies;
        console.log('Cookies recibidas:', cookies);
        console.log('Estas son las cookie',req.cookies)
        res.clearCookie('token', {
          httpOnly: true,  // Si la cookie fue configurada como httpOnly
          secure: false,   // Cambiar a true si usas HTTPS
          sameSite: 'lax', // O 'none' si trabajas con dominios cruzados y HTTPS
          path: '/',       // Asegúrate de que coincida con el path al configurar la cookie
        });

        return res.status(200).json({ message: 'Sesión cerrada correctamente' });
      }); 
app.get('/api/getCookie', async(req,res)=>{

        const cookies = req.cookies;
        console.log('Cookies recibidas:', cookies);
      
        if (!cookies.token) {

          console.log("estoy en falso")
          return res.status(400).json({ valid: false, message: 'Token no válido' });
          
        } else {
          console.log('ESTOY EN VERDADERO')
          return res.json({ valid: true, message: 'Sí, está el token' });
        }
      });
          
    
       

      

   

  
  
  

 
 
app.listen(port, () => {
        console.log(`Servidor escuchando en http://localhost:${port}`);
      });