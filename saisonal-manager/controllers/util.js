exports.jsonParse = function(data) {
    result = '';
    try {
        result = JSON.parse(data);
    } catch (e) {
        result = JSON.parse('[]');
    }
    return result;
}

exports.jsonParseErr = function(err) {
    console.log(err);
    result = JSON.parse('[]');
    return result;
}