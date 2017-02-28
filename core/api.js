var https = require('https');

//api访问
exports.get = function (url, callbacke, callback) {
    https.get(url, function (ress) {
        ress.on('data', function (data) {
            callback(data);
        })
    }).on('error', function (e) {
        callbacke(e);
        });
};

exports.post = function (url, data, callback) {

};
