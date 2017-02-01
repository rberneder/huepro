/*
 * DEPENDENCIES
 * */
var path = require('path');
var apiai = require('apiai');
var apiController = require('./apiController');



// GET /speech-portal
exports.sendIndex = function(req, res) {
    var location = [req.params.element, req.params.folder, req.params.file];
    var file = location.join('/');
    res.sendFile(path.join(__dirname, '../public/' + file));
};


// POST /speech-portal/query
exports.processQuery = function(req, res, next) {
    var speech = apiai("fe0fb27e266641ada46b0f9b877368dc");
    var request = speech.textRequest(req.body.query, {
        sessionId: 1    // Unique session-id
    });


    request.on('response', function(response) {
        if (response.result.action.indexOf('products') === 0) {
            apiController.processSpeechCommand(response, res);
        } else {
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify({
                response: response,
                data: null
            }));
        }

    });

    request.on('error', function(error) {
        console.log(error);
        res.send('ERROR: ' + error);
    });

    request.end();
}