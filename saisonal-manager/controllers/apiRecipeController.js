/*
 * DEPENDENCIES
 * */
var request = require('request');
var apiUrl = require('./config').apiUrl;
var util = require('./util');

// GET /api/recipes  ->  List of all recipes.
exports.getRecipes = function(req, res) {
	request.get(apiUrl + '/recipes', function(err, request, body) {
		if (err) {
			res.send(util.jsonParseErr(err));
		} else {
			res.send(util.jsonParse(body));
		}
	});
};


// GET /api/recipes/id/:id  ->  Returns recipe matching passed id.
exports.getRecipe = function(req, res) {
	request.get(apiUrl + '/recipes/id/' + req.params.id, function(err, request, body) {
		if (err) {
			res.send(util.jsonParseErr(err));
		} else {
			res.send(util.jsonParse(body));
		}
	});
};


// DELETE /api/recipes/id/a23df2f32fasc34  ->  Deletes the recipe with the corresponding ID
exports.deleteRecipe = function(req, res) {
	request.delete(apiUrl + '/recipes/id/' + req.params.id, function(err, request, body) {
		if (err) {
			res.send(util.jsonParseErr(err));
		} else {
			res.send(util.jsonParse(body));
		}
	});
};


// GET /api/recipes/search?str=test  -> Returns recipes that contain passed string in array.
exports.searchRecipes = function(req, res) {
	var str = req.params.str;

	if (str) {
		request.get(apiUrl + '/recipes/search/' + str, function(err, request, body) {
			if (err) {
				res.send(util.jsonParseErr(err));
			} else {
				res.send(util.jsonParse(body));
			}
		});
	}
};


// POST /api/recipes ->  Adds the recipe and returns the created API-entry.
exports.addRecipe = function(req, res) {
	request.post({url: apiUrl + '/recipes', form: req.body}, function(err, request, body) {
		if (err) {
			res.send(util.jsonParseErr(err));
		} else {
			res.send(util.jsonParse(body));
		}
	});
};


// PUT /api/recipes/id/a23df2f32fasc34 ->  Updates the recipe and returns the created API-entry.
exports.updateRecipe = function(req, res) {
	request.put({url: apiUrl + '/recipes/id/' + req.params.id, form: req.body}, function(err, request, body) {
		if (err) {
			res.send(util.jsonParseErr(err));
		} else {
			res.send(util.jsonParse(body));
		}
	});
};