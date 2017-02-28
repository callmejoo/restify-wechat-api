var restify = require('restify');
var https = require('https');
var wxsha1 = require('./core/wxsha1');
var init = require('./core/init');
var xml2js = require('xml2js');
var config = require('./core/config');

//创建服务器
var server = restify.createServer();
server.use(restify.queryParser());
server.use(restify.bodyParser());

//路由配置
server.get('/', check);
server.post('/', reply);

//启动服务器
init.isFirst(function () {
    console.log('配置加载完成。')
    var port = config.port();
    server.listen(port, function () {
        console.log('服务启动成功，监听端口号：%s', port);
    });
});

//服务器有效性验证
function check(req, res, next) {
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
}

//消息回复
function reply(req, res, next) {
    console.log('收到新消息:');
    var xml = req.body.toString();
    xml2js.parseString(xml, {explicitArray: false}, function (err,result) {
       if(err){
           console.error(err);
       } else {
           console.log(result);
           var receiver = result.xml.ToUserName;
           var sender = result.xml.FromUserName;
           var sendTime = result.xml.CreateTime;
           var msgType = result.xml.MsgType;
           var text = result.xml.Content;
           var msgId = result.xml.MsgId;
           if(text == '1'){
               console.log('yeah!!');
                // api.get('https://api.weixin.qq.com/cgi-bin/message/mass/send?access_token=', function () {
                //
                // })
           }
       }
    });
}