const express = require('express');
const { recipeCreate, getRecipes, getRecipe } = require('../controllers/recipes.controller');
const auth = require('../middlewares/auth');

const router = express.Router();

router.post('/', auth, recipeCreate);
router.get('/', getRecipes);
router.get('/:id', getRecipe);

module.exports = router;