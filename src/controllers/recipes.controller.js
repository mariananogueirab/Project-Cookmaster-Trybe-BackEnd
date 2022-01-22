const {
  createRecipe,
  findAllRecipes,
  findRecipeById,
  updateRecipe,
  recipeDelete,
  urlImage,
} = require('../services/recipe.service');
const { created, success, noContent } = require('../utils/dictionary/statusCode');

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

const recipeUpdate = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, ingredients, preparation } = req.body;
    /* const { userId } = req.user; */
    const recipe = await updateRecipe(id, name, ingredients, preparation);

    return res.status(success).json(recipe);
  } catch (error) {
    return res.status(error.status).json({ message: error.message });
  }
};

const findDeletedRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    await recipeDelete(id);

    return res.status(noContent).json();
  } catch (error) {
    return res.status(error.status).json({ message: error.message });
  }
};

const createUrlImage = async (req, res) => {
  try {
    const { id } = req.params;
    const image = `localhost:3000/src/uploads/${id}.jpeg`;
    const recipe = await urlImage(id, image);
    console.log('controller recipe: ', recipe);

    return res.status(success).json(recipe);
  } catch (error) {
    return res.status(error.status).json({ message: error.message });
  }
};

module.exports = {
  recipeCreate,
  getRecipes,
  getRecipe,
  recipeUpdate,
  findDeletedRecipe,
  createUrlImage,
};