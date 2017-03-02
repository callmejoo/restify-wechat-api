var wxsha1 = require('../core/wxsha1');
var xml2js = require('xml2js');
var handle = require('./handle');
var unknown = require('../functions/unknown');

//自定义插件
var weather = require('../functions/weather');
var videodownload = require('../functions/videodownload');

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
                //此处添加自定义插件
                weather(text, send);
                videodownload(text, send);

                //未知命令处理
                unknown(res);
            });
        }
    });
};