const Joi = require('joi');
const { create, findUserByEmail, createAdminUser } = require('../models/users.model');
const errorHandling = require('../utils/functions/errorHandling');
const {
  invalidEntry,
  emailAlreadyRegistered,
  incorrectData,
  allFields,
  onlyAdmins,
} = require('../utils/dictionary/messagesDefault');
const { badRequest, conflict, unauthorized, forbiden } = require('../utils/dictionary/statusCode');
const { generateToken } = require('./authService');

const userSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string()
  .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
  password: Joi.required(),
});

const validateUser = (name, email, password) => {
  const { error } = userSchema.validate({
    name,
    email,
    password,
  });
  if (error) throw errorHandling(badRequest, invalidEntry);
};

const createUser = async (name, email, password) => {
  validateUser(name, email, password);

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

const adminUserCreate = async (name, email, password, role) => {
  validateUser(name, email, password);
  if (role !== 'admin') throw errorHandling(forbiden, onlyAdmins);

  const id = await createAdminUser(name, email, password);
  return id;
};

module.exports = {
  createUser,
  findUser,
  adminUserCreate,
};