var path = require('path');
var fs = require('fs');
var gm = require('gm').subClass({imageMagick: true});


exports.deleteImage = function (img) {
    var imgPath = path.join(__dirname, "/../", img);
    var thumbPath = path.join(__dirname, '/../', img.substr(0, img.length - 4) + '_thumb' + img.substr(-4));
    
    fs.access(imgPath, fs.F_OK, function(err) {
        if (!err) {
            try {
                fs.rename(imgPath, path.join(__dirname, '/../uploads/trash/', img));
            } catch (e) {
                // File does not exist
            }
        }
    });

    fs.access(thumbPath, fs.F_OK, function(err) {
        if (!err) {
            try {
                fs.unlink(thumbPath);
            } catch (e) {
                // File does not exist
            }
        }
    });
}


exports.processUploadedImage = function (imgPath) {
    try {
        var srcPath = path.join(__dirname, "/../../saisonal-manager/temp/", imgPath);
        var targetPath = path.join(__dirname, '/../', imgPath);
        fs.rename(srcPath, targetPath);
        createThumb(targetPath);
    } catch (e) {
        console.log('Error: ImageManager cannot process image ' + imgPath, e);
    }
}


function createThumb (imgPath) {
    try {
        var imgThumb = imgPath.substr(0, (imgPath.length - 4)) + '_thumb' + imgPath.substr(-4);
        gm(imgPath).resize('400').write(imgThumb, function (err) {
            if (err) console.log('Error: ImageManager cannot create thumbnail.', err);
        });
    } catch (e) {
        console.log('Error: ImageManager cannot process image ' + imgPath, e);
    }
}