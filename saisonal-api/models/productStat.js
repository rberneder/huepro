var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductStatSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    product_id: {
        type: String,
        required: true
    },
    views: {
        type: Number,
        default: 0
    },
    trend: {
        type: Number,
        default: 0
    },
    pointsTotal: {
        type: Number,
        default: 0
    },
    points: [
        {
            points: {
                type: Number,
                default: 0
            },
            timestamp: {
                type: Date,
                default: Date.now
            }
        }
    ],
    trendSnapshot: {
        type: Number,
        default: 0
    },
    pointSnapshots: [
        {
            points: {
                type: Number,
                default: 0
            },
            timestamp: {
                type: Date,
                default: Date.now
            }
        }
    ]
});


ProductStatSchema.statics = {
    load: function(id, cb) {
        this.findOne({_id : id}).exec(cb);
    }
};


mongoose.model('ProductStat', ProductStatSchema);