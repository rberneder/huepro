var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductStatSchema = new Schema({
    product_id: {
        type: String,
        required: true
    },
    views: {
        type: Number,
        default: 0
    },
    overallPoints: {
        type: Number,
        default: 0
    },
    trendPointsArr: {
        type: [Number]
    },
    trend: {
        type: Number,
        default: 0
    },
    lastTrendIndexing: {
        type: Date,
        default: new Date()
    }
});


ProductStatSchema.statics = {
    load: function(id, cb) {
        this.findOne({_id : id}).exec(cb);
    }
};


mongoose.model('ProductStat', ProductStatSchema);