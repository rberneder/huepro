/**
 * GET /
 * Home page.
 */
exports.index = function(req, res) {
    res.sendFile('/public/index.html');
};