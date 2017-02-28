var db = require('./db');
var api = require('./api');
var config = require('./config');

const  token = config.getConfig().secret.token;
const AppID = config.getConfig().secret.AppID;
const AppSecret =config.getConfig().secret.AppSecret;

exports.get = function (callback) {
    db.connect(function () {
        db.getToken(function (err, row) {
            var now = new Date().getTime();
            var expires = row.expires;
            if(now >= expires) {
                console.log('token过期');
                console.log('正在更新token...');
                api.get('https://hk.api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid='+ AppID+ '&secret=' + AppSecret, function ( e, data) {
                    if(e){
                        callback(e);
                    }else {
                        db.updateToken(data.access_token,  data.expires_in, function () {
                            console.log('token更新成功！');
                            callback(data.access_token);
                        });
                    }
                });
            }else {
                console.log('token状态正常');
                callback(row.token);
            }
        })
    })
};
exports.update = function (callback) {
    console.log('正在更新token...');
    api.get('https://hk.api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid='+ AppID+ '&secret=' + AppSecret, function ( e, data) {
        if(e){
            callback(e);
        }else {
            db.updateToken(data.access_token,  data.expires_in, function () {
                callback(data.access_token);
            });
        }
    });
};