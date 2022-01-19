const Joi = require('joi');
const { create, findUserByEmail } = require('../models/users.model');
const errorHandling = require('../utils/functions/errorHandling');
const { invalidEntry, emailAlreadyRegistered } = require('../utils/dictionary/messagesDefault');
const { badRequest, conflict } = require('../utils/dictionary/statusCode');

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

module.exports = {
  createUser,
};