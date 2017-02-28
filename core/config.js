var fs = require('fs');

var file = './config.json';
var config = JSON.parse(fs.readFileSync(file));

exports.appid = function () {
    return config.secret.AppId;
};
exports.token = function () {
    return config.secret.Token;
};
exports.appsecret = function () {
    return config.secret.AppSecret;
};
exports.check = function () {
    return config.other.needCheck;
};
exports.port = function () {
    return config.other.Port;
};
