// src/utils/helpers.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'change_this_secret';

/**
 * Hash un mot de passe
 * @param {String} password
 * @returns {String} hash
 */
async function hashPassword(password) {
  return await bcrypt.hash(password, 10);
}

/**
 * Vérifie un mot de passe
 * @param {String} password
 * @param {String} hash
 * @returns {Boolean}
 */
async function comparePassword(password, hash) {
  return await bcrypt.compare(password, hash);
}

/**
 * Génère un JWT
 * @param {String} userId
 * @param {String} role
 * @returns {String} token
 */
function generateToken(userId, role) {
  return jwt.sign({ id: userId, role }, JWT_SECRET, { expiresIn: '7d' });
}

module.exports = {
  hashPassword,
  comparePassword,
  generateToken
};
