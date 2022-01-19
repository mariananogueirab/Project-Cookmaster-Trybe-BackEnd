const Joi = require('joi');
const { create, findUserByEmail } = require('../models/users.model');
const errorHandling = require('../utils/functions/errorHandling');
const {
  invalidEntry,
  emailAlreadyRegistered,
  incorrectData,
  allFields,
} = require('../utils/dictionary/messagesDefault');
const { badRequest, conflict, unauthorized } = require('../utils/dictionary/statusCode');
const { generateToken } = require('./authService');

const userSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string()
  .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
  password: Joi.required(),
});

const createUser = async (name, email, password) => {
  const { error } = userSchema.validate({
    name,
    email,
    password,
  });
  if (error) throw errorHandling(badRequest, invalidEntry);

  const emailAlreadyExists = await findUserByEmail(email);

  if (emailAlreadyExists) throw errorHandling(conflict, emailAlreadyRegistered);

  const id = await create(name, email, password);
  return id;
};

const findUser = async (email, password) => {
  if (!email || !password) throw errorHandling(unauthorized, allFields);

  const userFound = await findUserByEmail(email);
  if (!userFound || userFound.password !== password) {
    throw errorHandling(unauthorized, incorrectData); 
  }

  const { password: _password, ...userWithoutPassword } = userFound;

  const token = generateToken(userWithoutPassword);
  return token;
};

module.exports = {
  createUser,
  findUser,
};