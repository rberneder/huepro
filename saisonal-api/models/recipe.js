var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RecipeSchema = new Schema({
	created: {
		type: Date,
		default: Date.now
	},
	name: {
		type: String,
		required: true
	},
	image: String,  // TODO make required
	ingredients: {
		type: String,
		required: true
	},
	decription: {
		type: String,
		required: true
	},
	productFamilies: [String],
	products: [String]
});

RecipeSchema.statics = {
	load: function(id, cb) {
		this.findOne({_id : id}).exec(cb);
	}
};

mongoose.model('Recipe', RecipeSchema);