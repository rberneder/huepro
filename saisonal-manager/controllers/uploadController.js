var path = require('path');
var fs = require('fs');
var uuid = require('uuid-v4');
var formidable = require('formidable');

function copyFile(source, target, cb) {
    var cbCalled = false;

    var rd = fs.createReadStream(source);
    rd.on("error", function(err) {
        done(err);
    });
    var wr = fs.createWriteStream(target);
    wr.on("error", function(err) {
        done(err);
    });
    wr.on("close", function(ex) {
        done();
    });
    rd.pipe(wr);

    function done(err) {
        if (!cbCalled) {
            cb(err);
            cbCalled = true;
        }
    }
}

exports.uploadProductImage = function (req, res, next) {
    res.setHeader('Content-Type', 'application/json');

    var form = new formidable.IncomingForm();
    form.uploadDir = __dirname + "/../temp/uploads/products/images/";
    
    form.parse(req, function(err, fields, files) {
        var fileName = files.file.name.toLowerCase();
        var fileExt = (fileName.substr(-5) == '.jpeg') ? '.jpg' : fileName.substr(-4);
        var newFileName = uuid() + fileExt;
        
        var newfile = __dirname + "/../temp/uploads/products/images/" + newFileName;

        if (files.file.size < 3145728 && files.file.type.match(/^(image)/gi)) {
            copyFile(files.file.path, newfile, function(err) {
                if (err) {
                    console.log(err);
                    req.flash("error", "Oops, something went wrong! (reason: copy)");
                    return res.send('{"uploadSuccess": false}');
                }

                fs.unlink(files.file.path, function(err) {
                    if (err) {
                        req.flash("error", "Oops, something went wrong! (reason: deletion)");
                        return res.send('{"uploadSuccess": false}');
                    }
                    return res.send('{"uploadSuccess": true, "file": {"name": "/uploads/products/images/' + newFileName + '"}}');
                });
            });
        } else {
            return res.send('{"uploadSuccess": false, "error": "Maximum file-size is 3MB. The file must be of type image."');
        }
    });
}