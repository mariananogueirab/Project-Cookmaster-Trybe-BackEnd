const express = require('express');
const { recipeCreate, getRecipes } = require('../controllers/recipes.controller');
const auth = require('../middlewares/auth');

const router = express.Router();

router.post('/', auth, recipeCreate);
router.get('/', getRecipes);

module.exports = router;