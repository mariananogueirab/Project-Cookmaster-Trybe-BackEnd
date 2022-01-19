const { findUser } = require('../services/users.service');
const { success } = require('../utils/dictionary/statusCode');

const login = async (req, res, _next) => {
  try {
    const { email, password } = req.body;
    const token = await findUser(email, password);
    return res.status(success).json({ token });
  } catch (error) {
    return res.status(error.status).json({ message: error.message });
  }
};

module.exports = {
  login,
};