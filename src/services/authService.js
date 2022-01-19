const jwt = require('jsonwebtoken');

const API_SECRET = 'ABC123456';

const JWT_CONFIG = {
  expiresIn: 3600,
  algorithm: 'HS256',
};

const generateToken = (user) => jwt.sign({ user }, API_SECRET, JWT_CONFIG);

const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, API_SECRET);
    const { user } = decoded;
    return user;
  } catch (error) {
    console.log('FALHA NA VERIFICAÇÃO');
    return null;
  }
};

module.exports = {
  generateToken,
  verifyToken,
};