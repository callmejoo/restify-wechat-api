var fs = require('fs');

var file = './reply.json';
var config = JSON.parse(fs.readFileSync(file));

module.exports = function () {
    return config;
};