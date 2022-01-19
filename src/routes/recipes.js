const express = require('express');
const {
  recipeCreate,
  getRecipes,
  getRecipe,
  recipeUpdate,
  findDeletedRecipe,
} = require('../controllers/recipes.controller');
const auth = require('../middlewares/auth');

const router = express.Router();

router.post('/', auth, recipeCreate);
router.get('/', getRecipes);
router.get('/:id', getRecipe);
router.put('/:id', auth, recipeUpdate);
router.delete('/:id', auth, findDeletedRecipe);

module.exports = router;