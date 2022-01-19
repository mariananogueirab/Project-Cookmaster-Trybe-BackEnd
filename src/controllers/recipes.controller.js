const { createRecipe } = require('../services/recipe.service');
const { created } = require('../utils/dictionary/statusCode');

const recipeCreate = async (req, res, _next) => {
  try {
    const { name, ingredients, preparation } = req.body;
    const id = await createRecipe(name, ingredients, preparation);

    const { _id: idUser } = req.user;

    return res.status(created)
      .json({ recipe: { name, ingredients, preparation, userId: idUser, _id: id } });
  } catch (error) {
    return res.status(error.status).json({ message: error.message });
  }
};

module.exports = {
  recipeCreate,
};