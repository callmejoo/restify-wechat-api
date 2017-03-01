var https = require('https');

//api访问
exports.get = function (url, callback) {
    https.get(url, function (ress) {
        ress.on('data', function (data) {
            console.log('获取到data:'+ data);
            callback(data);
        })
    }).on('error', function (e) {
        callback(e);
        });
};

exports.post = function (url, data, callback) {

};
