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
    image: String,
    productFamily_id: {
        type: String,
        required: true
    },
    plantStart: {
        month: Number,
        day: Number
    },
    plantDays: Number,
    harvestStart: {
        month: {
            type: Number,
            required: true
        },
        day: Number
    },
    harvestDays: {
        type: Number,
        required: false
    },
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