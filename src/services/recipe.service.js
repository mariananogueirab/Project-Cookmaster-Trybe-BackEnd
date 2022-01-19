const Joi = require('joi');
const {
  create,
  getAllRecipes,
  getRecipeById,
  update,
  deleteRecipe,
} = require('../models/recipes.model');
const errorHandling = require('../utils/functions/errorHandling');
const { badRequest, notFound } = require('../utils/dictionary/statusCode');
const { invalidEntry, recipeNotFound } = require('../utils/dictionary/messagesDefault');

const recipesSchema = Joi.object({
  name: Joi.string().required(),
  ingredients: Joi.string().required(),
  preparation: Joi.string().required(),
});

const idSchema = Joi.object({
  id: Joi.string().length(24).required(),
});

const validateRecipeId = (id) => {
  const { error } = idSchema.validate({
    id,
  });

  if (error) throw errorHandling(notFound, recipeNotFound);
};

const createRecipe = async (name, ingredients, preparation, userId) => {
  const { error } = recipesSchema.validate({
    name,
    ingredients,
    preparation,
  });

  if (error) throw errorHandling(badRequest, invalidEntry);
  const id = await create(name, ingredients, preparation, userId);
  return id;
};

const findAllRecipes = async () => {
  const recipes = await getAllRecipes();
  return recipes;
};

const findRecipeById = async (id) => {
  validateRecipeId(id);
  const recipe = await getRecipeById(id);

  if (!recipe) throw errorHandling(notFound, recipeNotFound);
  return recipe;
};

const updateRecipe = async (id, name, ingredients, preparation) => {
  validateRecipeId(id);
  const recipe = await update(id, name, ingredients, preparation);
  if (!recipe) throw errorHandling(notFound, recipeNotFound);

  return recipe;
};

const recipeDelete = async (id) => {
  validateRecipeId(id);
  const recipe = await deleteRecipe(id);
  if (!recipe) throw errorHandling(notFound, recipeNotFound);
  return recipe;
};

module.exports = {
  createRecipe,
  findAllRecipes,
  findRecipeById,
  updateRecipe,
  recipeDelete,
};