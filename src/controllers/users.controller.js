const { createUser, adminUserCreate } = require('../services/users.service');
const { created } = require('../utils/dictionary/statusCode');

const userCreate = async (req, res, _next) => {
  const { name, email, password } = req.body;
  try {
    const id = await createUser(name, email, password);
    const newUser = {
      name,
      email,
      role: 'user',
      _id: id,
    };

    return res.status(created).json({ user: newUser });
  } catch (error) {
    return res.status(error.status).json({ message: error.message });
  }
};

const admin = async (req, res) => {
  const { name, email, password } = req.body;
  const { role } = req.user;
  try {
    const id = await adminUserCreate(name, email, password, role);
    const newUser = {
      name,
      email,
      role: 'admin',
      _id: id,
    };

    return res.status(created).json({ user: newUser });
  } catch (error) {
    return res.status(error.status).json({ message: error.message });
  }
};

module.exports = {
  userCreate,
  admin,
};