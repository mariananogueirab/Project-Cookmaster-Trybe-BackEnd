const Joi = require('joi');
const { create } = require('../models/users.model');
const { invalidEntry } = require('../utils/dictionary/messagesDefault');

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
  if (error) throw invalidEntry;

  const id = await create(name, email, password);
  return id;
};

module.exports = {
  createUser,
};