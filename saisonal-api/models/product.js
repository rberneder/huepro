var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    name: String,
    productFamily: Number,
    plantStart: Date,
    plantDays: Number,
    harvestStart: Date,
    harvestDays: Number,
    storageDays: Number,
    shortDescription: String,
    description: String
});


ProductSchema.statics = {
    load: function(id, cb) {
        this.findOne({_id : id}).exec(cb);
    }
};


mongoose.model('Product', ProductSchema);