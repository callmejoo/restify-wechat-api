var msg = require('./msg');
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
        console.log('↑ ' + content)
    };
    callback(text, send);
};