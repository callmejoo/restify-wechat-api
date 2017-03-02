module.exports = function (res) {
    setTimeout(function () {
        res.end('');
    }, 4000)
};