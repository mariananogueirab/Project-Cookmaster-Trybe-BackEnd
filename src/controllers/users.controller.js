const { createUser } = require('../services/users.service');
const { badRequest, created } = require('../utils/dictionary/statusCode');

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
    return res.status(badRequest).json({ message: error });
  }
};

module.exports = {
  userCreate,
};