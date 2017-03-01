exports.make = function (from, to, type, content) {
    var now = new Date().getTime().toString();
    var nowStamp = now.slice(0,10);
    var xml = '<xml><ToUserName>'+to+'</ToUserName><FromUserName>'+from+'</FromUserName><CreateTime>'+nowStamp+'</CreateTime><MsgType>'+type+'</MsgType><Content>'+content+'</Content></xml>';
    return xml;
};