var wxsha1 = require('../core/wxsha1');
var xml2js = require('xml2js');
var handle = require('./handle');
var api = require('../core/api');
var https = require('https');
var urlencode = require('urlencode');

exports.check = function (req, res) {
    var signature = req.query.signature;
    var timestamp = req.query.timestamp;
    var nonce = req.query.nonce;
    var echostr = req.query.echostr;
    var finalArr = wxsha1.sha1Str(token, timestamp, nonce);
    if(finalArr == signature){        //验证请求是否来自微信
        res.charSet('utf-8');
        res.end(echostr);
    }else{
        res.end('');
    }
};
exports.response = function (req, res) {
    var xml = req.body;
    xml2js.parseString(xml, {explicitArray: false}, function (err, data) {
        if(err){
            console.error(err);
        } else {
            handle.do(res, data, function (text, send) {
                var weather = text.indexOf('天气');
                if(weather != -1 ){
                    var location = text.replace('天气','');
                    https.get('https://api.thinkpage.cn/v3/weather/now.json?key=90cchlqs5ekrtutj&location='+ urlencode(location) +'&language=zh-Hans&unit=c', function(ress){
                        ress.on('data', function (json) {
                            json = JSON.parse(json);
                            if (json.status_code) {
                                send.text('天气获取失败，可能是输入了错误的地名或格式不正确。')
                            } else {
                                send.text(location + '：\n' +
                                    '当前天气：' + json.results[0].now.text + ' 气温：' + json.results[0].now.temperature + '℃');
                            }
                        });
                    }).on('error', function (e) {
                        console.log(e);
                    });
                }
            });
        }
    });
};