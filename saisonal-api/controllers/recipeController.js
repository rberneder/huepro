require('../models/recipe');
var path = require('path');
var mongoose = require('mongoose');
var fs = require('fs');
var _ = require('underscore');
var Recipe = mongoose.model('Recipe');
var imageManager = require('../util/imageManager');


/** Lists all recipes. */
exports.getAllRecipes = function(req, res) {
	Recipe.find()
		.sort({'name': 'asc'})
		.exec(function(err, recipes) {
			if (err) {
				// TODO log error
				res.jsonp('[]');
			} else {
				res.jsonp(recipes);
			}
		});
};

/** Returns the recipe corresponding the passed ID. */
exports.show = function(req, res) {
	Recipe.load(req.params.recipeId, function(err, recipe) {
		if (err || !recipe) {
			// TODO log error
			res.jsonp('[]');
		} else {
			res.jsonp(recipe);
		}
	});
};


/** Returns the recipes which includes the given product */

exports.getRecipesByProduct = function (req, res) {
	var incredient = decodeURI(req.params.productId);
	Recipe.find({'products':  incredient})
		.exec(function (err, recipes) {
			if(err){
                // TODO log error
                res.jsonp('[]');
			} else {
				res.jsonp(recipes);
			}
        });
}


exports.searchRecipeNames = function (req, res) {
	var str = decodeURI(req.params.str);
	Recipe.find({'name': new RegExp('(' + str + ')', 'i')})
		.sort({'name': 'asc'})
		.exec(function(err, recipes) {
			if (err) {
				// TODO log error
				res.jsonp('[]');
			} else {
				res.jsonp(recipes);
			}
		});
}


/** Adds a new recipe. */
exports.post = function(req, res) {
	var recipe = new Recipe(req.body);    // TODO Werte überprüfen
	var img = recipe.image;
	if (img.substr(-5) === '.jpeg') img = (img.substr(0, (img.length - 5)) + '.jpg');   // Change .jpeg to .jpg

	if (img) imageManager.processUploadedImage(img);

	recipe.save();
	res.jsonp(recipe);
};


/** Updates recipe. */
exports.put = function(req, res) {
	Recipe.load(req.params.recipeId, function(err, recipe) {
		if (err) {
			// TODO log error
			res.jsonp('[]');
		} else {
			recipe = _.extend(recipe, req.body);
			recipe.save(function(err) {
				res.jsonp(recipe);
			});
		}
	});
};


/** Deletes the recipe corresponding the passed ID. */
exports.delete = function(req, res) {
	Recipe.load(req.params.recipeId, function(err, recipe) {
		if (err) {
			// TODO log error
			res.jsonp('[]');
		} else {
			if (!recipe) return res.jsonp('[]');

			var img = recipe.image;
			if (img) imageManager.deleteImage(img);

			recipe.remove(function(err) {
				res.jsonp(recipe);
			});
		}
	});
};

