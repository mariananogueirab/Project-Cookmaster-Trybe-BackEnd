const jwt = require('jsonwebtoken');

const API_SECRET = 'ABC123456';

const JWT_CONFIG = {
  expiresIn: 3600,
  algorithm: 'HS256',
};

const generateToken = (user) => jwt.sign({ user }, API_SECRET, JWT_CONFIG);

module.exports = {
  generateToken,
};