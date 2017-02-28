var sha1 = require('sha1');
function sha1Str(token, timestamp, nonce) {
    var arr = [];
    arr.push(token, timestamp, nonce);
    arr.sort();
    return sha1(arr.join(''));
}
exports.sha1Str = sha1Str();