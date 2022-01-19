const { createRecipe, findAllRecipes, findRecipeById } = require('../services/recipe.service');
const { created, success } = require('../utils/dictionary/statusCode');

const recipeCreate = async (req, res, _next) => {
  try {
    const { name, ingredients, preparation } = req.body;
    const { _id: idUser } = req.user;
    const id = await createRecipe(name, ingredients, preparation, idUser);

    return res.status(created)
      .json({ recipe: { name, ingredients, preparation, userId: idUser, _id: id } });
  } catch (error) {
    return res.status(error.status).json({ message: error.message });
  }
};

const getRecipes = async (req, res) => {
  try {
    const recipes = await findAllRecipes();
    return res.status(success).json(recipes);
  } catch (error) {
    return res.status(error.status).json({ message: error.message });
  }
};

const getRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const recipe = await findRecipeById(id);
    return res.status(success).json(recipe);
  } catch (error) {
    return res.status(error.status).json({ message: error.message });
  }
};

module.exports = {
  recipeCreate,
  getRecipes,
  getRecipe,
};