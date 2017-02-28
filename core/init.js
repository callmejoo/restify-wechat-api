var fs = require('fs');
var db = require('./db');
function isFirst(callback) {
    fs.exists('./db.sqlite3', function (e) {
        if(!e) {
            console.log('未发现配置数据库，正在为您创建...');
            initDataBase(function () {
                callback(null);
            });
        }
        else{
            console.log('加载本地配置...');
            callback(null);
        }
    });
}
function initDataBase(callback) {
    fs.appendFile('./','db.sqlite3', function () {
        db.connect(function () {
            db.setup(function () {
                console.log('数据库创建完成！');
                callback(null)
            });
        });

    });
}
exports.isFirst = isFirst;
