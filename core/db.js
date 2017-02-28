var sqlite3 = require('sqlite3');
sqlite3.verbose();
var db = undefined;

exports.connect = function (callback) {
    db = new sqlite3.Database('db.sqlite3', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, function (err) {
        if(err){
            console.log('数据库创建失败：'+ err);
            callback(err);
        }else {
            callback(null);
        }
    });
};

exports.disconnect = function (callback) {
    callback(null);
};

exports.setup = function (callback) {
    db.run('CREATE TABLE IF NOT EXISTS token' + '(id INT, token TEXT, time DATETIME, expires INT)', function (err) {
        if(err){
            console.log('数据库表创建错误：'+ err);
            callback(err);
        }else {
            db.run('INSERT INTO token(id) VALUES(1);', function (err) {
                if(err){
                    console.log(err);
                    callback(err);
                }else {
                    callback(null)
                }
            });
        }
    });
};

exports.updateToken = function (token, expires, callback) {
    var now = new Date();
    now = now.getTime();
    db.run('UPDATE token ' + 'SET token = ?, time = ?, expires = ?' + 'WHERE id = ?',[token, now, now+(expires-200)*1000, '1'],function (err) {
        if(err){
            console.log('更新Token失败：' + err);
            callback(err)
        }else{
            callback(null);
        }
    });
};

exports.getToken = function (callback) {
    var didOne = false;
    db.each('SELECT * FROM token WHERE id = ?', [ 1 ],function (err, row) {
        if(err){
            console.log('尝试从数据库获取Token失败：' + err);
            callback(err, null)
        }else{
            if(!didOne){
                callback(null, row);
                didOne = true;
            }
        }
    })
};