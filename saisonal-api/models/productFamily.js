var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductFamilySchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    name: String,
    productCategory_id: String
});


ProductFamilySchema.statics = {
    load: function(id, cb) {
        this.findOne({_id : id}).exec(cb);
    }
};


mongoose.model('ProductFamily', ProductFamilySchema);