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
    var form = new formidable.IncomingForm();
    form.uploadDir = __dirname + "/../temp/images/";
    form.parse(req, function(err, fields, files) {
        var newfile, path, versionName;
        var fileName = files.file.name.toLowerCase();
        var fileExt = (fileName.substr(-5) == '.jpeg') ? '.jpg' : fileName.substr(-4);
        var newFileName = uuid() + fileExt;
        newfile = __dirname + "/../temp/images/" + newFileName;

        if (files.file.size < 3145728 && files.file.type.match(/^(image)/gi)) {
            copyFile(files.file.path, newfile, function(err) {
                if (err) {
                    console.log(err);
                    req.flash("error", "Oops, something went wrong! (reason: copy)");
                    return res.redirect(req.url);
                }

                fs.unlink(files.file.path, function(err) {
                    if (err) {
                        req.flash("error", "Oops, something went wrong! (reason: deletion)");
                        return res.jsonp('{"upload-success": false}');
                    }
                    return res.jsonp('{upload-success: true, file: {name: ' + newFileName + '}}');
                });
            });
        } else {
            return res.jsonp('{upload-success: false, error: "Maximum file-size is 3MB. The file must be of type image."');
        }
    });
}