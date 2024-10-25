// backend/models/userModel.js
const db = require('../db'); // Conexión a MySQL

const User = {
  findByEmail: async (email) => {
    const result = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    return result[0];
  },
  updateResetToken: async (email, token, expires) => {
    await db.query('UPDATE users SET reset_password_token = ?, reset_password_expires = ? WHERE email = ?', [token, expires, email]);
  },
  resetPassword: async (id, hashedPassword) => {
    await db.query('UPDATE users SET password = ?, reset_password_token = NULL, reset_password_expires = NULL WHERE id = ?', [hashedPassword, id]);
  }
};

module.exports = User;
