var express = require('express');
var router = express.Router();

var recipes = require('../controllers/recipeController');

/* # # # # # # # # # # # # #  RECIPES  # # # # # # # # # # # # # */
/*
 * GET
 * */

// GET /recipes
router.get('/', recipes.getAllRecipes);

// GET /recipes/id/asdfj23k2of9f32
// GET /recipes/id/asdfj23k2of9f32?p=3
router.get('/id/:recipeId', recipes.show);

// GET /recipes/search?str=jona
router.get('/search/:str', recipes.searchRecipeNames);

/*
 * POST
 * */

// POST /recipes
router.post('/', recipes.post);

// PUT /recipes/id/af243ec243c2c23423  --> body: Datenobjekt
router.put('/id/:recipeId', recipes.put);

// DELETE /recipes/id/asdf22asf2far32
router.delete('/id/:recipeId', recipes.delete);

module.exports = router;
