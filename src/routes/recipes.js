const express = require('express');
const {
  recipeCreate,
  getRecipes,
  getRecipe,
  recipeUpdate,
  findDeletedRecipe,
  createUrlImage,
} = require('../controllers/recipes.controller');
const auth = require('../middlewares/auth');
const upload = require('../config/multer');

const router = express.Router();

router.post('/', auth, recipeCreate);
router.get('/', getRecipes);
router.get('/:id', getRecipe);
router.put('/:id', auth, recipeUpdate);
router.delete('/:id', auth, findDeletedRecipe);
router.put('/:id/image', auth, upload.single('image'), createUrlImage); // vem um controller ainda

module.exports = router;