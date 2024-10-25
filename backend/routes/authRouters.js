const express = require('express');
const router = express.Router();
const { recoverPassword, resetPassword } = require('../controllers/authController');

router.post('/recover-password', recoverPassword);  // Enviar token al correo
router.post('/reset-password/:token', resetPassword);  // Restablecer la contraseña

module.exports = router;