var restify = require('restify');
var init = require('./core/init');
var config = require('./core/config');
var wechat = require('./wechat/wechat');

//创建服务器
var server = restify.createServer();
server.use(restify.queryParser());
server.use(restify.bodyParser());

//路由配置
server.get('/', wechat.check);
server.post('/', wechat.response);

//启动服务器
init.isFirst(function () {
    console.log('配置加载完成。');
    var port = config.port();
    server.listen(port, function () {
        console.log('服务启动成功，监听端口号：%s', port);
    });
});