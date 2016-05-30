var fs = require('fs');
var gm = require('gm').subClass({imageMagick: true});


exports.createThumb = function(imgUrl) {
    var imgThumb = imgUrl.substr(0, (imgUrl.length - 4)) + '_thumb' + imgUrl.substr(-4);
    gm(imgUrl).resize('400').write(imgThumb, function (err) {
        if (err) console.log(err);
    });
}