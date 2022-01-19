const express = require('express');
const { recipeCreate } = require('../controllers/recipes.controller');
const auth = require('../middlewares/auth');

const router = express.Router();

router.post('/', auth, recipeCreate);

module.exports = router;