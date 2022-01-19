const Joi = require('joi');
const { create, getAllRecipes } = require('../models/recipes.model');
const errorHandling = require('../utils/functions/errorHandling');
const { badRequest } = require('../utils/dictionary/statusCode');
const { invalidEntry } = require('../utils/dictionary/messagesDefault');

const recipesSchema = Joi.object({
  name: Joi.string().required(),
  ingredients: Joi.string().required(),
  preparation: Joi.string().required(),
});

const createRecipe = async (name, ingredients, preparation) => {
  const { error } = recipesSchema.validate({
    name,
    ingredients,
    preparation,
  });

  if (error) throw errorHandling(badRequest, invalidEntry);
  const id = await create(name, ingredients, preparation);
  return id;
};

const findAllRecipes = async () => {
  const recipes = await getAllRecipes();
  return recipes;
};

module.exports = {
  createRecipe,
  findAllRecipes,
};