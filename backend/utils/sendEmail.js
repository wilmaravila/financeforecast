
const nodemailer = require("nodemailer");




 const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for port 465, false for other ports
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

transporter.verify().then(()=>{
    console.log('Ready send emails')
    console.log(typeof transporter); // Debería mostrar "object"

})
module.exports = transporter;