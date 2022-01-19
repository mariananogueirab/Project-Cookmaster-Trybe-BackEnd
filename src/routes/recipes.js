const express = require('express');
const {
  recipeCreate,
  getRecipes,
  getRecipe,
  recipeUpdate,
} = require('../controllers/recipes.controller');
const auth = require('../middlewares/auth');

const router = express.Router();

router.post('/', auth, recipeCreate);
router.get('/', getRecipes);
router.get('/:id', getRecipe);
router.put('/:id', auth, recipeUpdate);

module.exports = router;