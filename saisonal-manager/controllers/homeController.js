var path = require('path');

/**
 * GET /
 * Home page.
 */
exports.index = function(req, res) {
    res.sendFile(path.join(__dirname, '../index.html'));
};

// GET /uploads/products/images/file
exports.getFile = function(req, res) {
    try {
        var location = [req.params.element, req.params.folder, req.params.file];
        var file = location.join('/');
        res.sendFile(path.join(__dirname, '../../saisonal-api/uploads/' + file));
    } catch (e) {
        console.log(e);
        next();
    }
}