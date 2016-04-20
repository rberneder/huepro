var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductCategorySchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    name: String
});


ProductCategorySchema.statics = {
    load: function(id, cb) {
        this.findOne({_id : id}).exec(cb);
    }
};


mongoose.model('ProductCategory', ProductCategorySchema);