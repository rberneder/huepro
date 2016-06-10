var path = require('path');

//GET /  ->  Home page.
exports.index = function(req, res) {
    res.sendFile(path.join(__dirname, '../public/app.html'));
};

exports.siteUnderConstruction = function(req, res, next) {
    if (req.method == 'GET') {
        if (req.cookies.hasAccess && req.cookies.hasAccess == 1) {
            next();
        } else {
            res.sendFile(path.join(__dirname, '../public/site-under-construction.html'));
        }
    }
}

exports.siteUnderConstructionPost = function(req, res) {
    if (req.body.password && req.body.password === 'B33nS4isonal') {
        if (!req.cookies.hasAccess) {
            res.cookie('hasAccess', 1, { maxAge: 900000 });
        }
    }
    res.redirect('/');
}

// GET /uploads/products/images/file
exports.getFile = function(req, res, next) {
    try {
        var location = [req.params.element, req.params.folder, req.params.file];
        var file = location.join('/');
        res.sendFile(path.join(__dirname, '../../saisonal-api/uploads/' + file));
    } catch (e) {
        console.log(e);
        next();
    }
}