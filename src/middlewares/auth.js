const { verifyToken } = require('../services/authService');
const { jwtMalformed, missingAuth } = require('../utils/dictionary/messagesDefault');
const { unauthorized } = require('../utils/dictionary/statusCode');

module.exports = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) return res.status(unauthorized).json({ message: missingAuth });
    
    const user = verifyToken(authorization);

    if (!user) return res.status(unauthorized).json({ message: jwtMalformed });
    req.user = user;
    next();
  } catch (error) {
    console.log('FALHA AUTH');
    return res.status(error.status).json({ message: error.message });
  }
};