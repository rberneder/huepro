var path = require('path');

/**
 * GET /
 * Home page.
 */
exports.index = function(req, res) {
    res.sendFile(path.join(__dirname, '../index.html'));
};