var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    name: String,
    image: String,
    productFamily: Number,
    plantStart: {
        month: Number,
        day: Number
    },
    plantDays: Number,
    harvestStart: {
        month: Number,
        day: Number
    },
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