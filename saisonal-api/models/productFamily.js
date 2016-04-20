var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductFamilySchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    name: {
        type: String,
        required: true
    },
    productCategory_id: {
        type: String,
        required: true
    }
});


ProductFamilySchema.statics = {
    load: function(id, cb) {
        this.findOne({_id : id}).exec(cb);
    }
};


mongoose.model('ProductFamily', ProductFamilySchema);