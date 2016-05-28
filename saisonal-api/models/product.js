var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    name: {
        type: String,
        required: true
    },
    image: String,  // TODO make required
    family: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    plantStartMonth: Number,
    plantStartDay: Number,
    plantEndMonth: Number,
    plantEndDay: Number,
    harvestStartMonth: {
        type: Number,
        required: true
    },
    harvestStartDay: {
        type: Number,
        required: true
    },
    harvestEndMonth: {
        type: Number,
        required: true
    },
    harvestEndDay: {
        type: Number,
        required: true
    },
    storageDays: Number,
    shortDescription: String,
    description: {
        type: String,
        required: true
    }
});


ProductSchema.statics = {
    load: function(id, cb) {
        this.findOne({_id : id}).exec(cb);
    }
};


mongoose.model('Product', ProductSchema);