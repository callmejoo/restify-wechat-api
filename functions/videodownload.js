module.exports = function (text, send) {
    if(text.indexOf('miaopai.com') != -1){
        var httpStr = 'http://';
        var url = text.replace(httpStr, '');
        url = httpStr.concat(url);
        var src = 'www.miaopai.com/show';
        var rep = 'gslb.miaopai.com/stream';
        var result = url.replace(src, rep);
        result = result.replace('htm', 'mp4');
        if(result.indexOf('stream') == -1 || result.indexOf('mp4') == -1 ){
            send.text('地址解析失败，可能是你输入了错误的链接格式。\n网址格式参照请发送“短视频”')
        }else{
            send.text('下载地址：\n' + result);
        }
    }
};