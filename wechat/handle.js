var msg = require('./msg');
var reply = require('../core/reply');

var replyList = reply();

exports.do = function (res, data, callback) {
    var receiver = data.xml.ToUserName;
    var sender = data.xml.FromUserName;
    var sendTime = data.xml.CreateTime;
    var msgType = data.xml.MsgType;
    var text = data.xml.Content;
    var msgId = data.xml.MsgId;
    console.log('↓ '+ text);
    var send = {};
    send.text = function (content) {
        var message = msg.make(receiver, sender, 'text', content);
        res.end(message);
        console.log('↑ ' + content);
    };
    for(var key in replyList){
        if(text.indexOf(key) != -1){
            send.text(replyList[key]);
        }
    }
    callback(text, send);
};