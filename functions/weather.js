var https = require('https');
var urlencode = require('urlencode');

module.exports = function (text, send) {
    var weather = text.indexOf('天气');
    if(weather != -1 ){
        var location = text.replace('天气','');
        https.get('https://free-api.heweather.com/v5/weather?city='+ urlencode(location) +'&key=498ffe4ba487474b8f4b00ed9cab7bd1', function(ress){
            ress.on('data', function (json) {
                json = JSON.parse(json);
                console.log(json);
                if (json.HeWeather5["0"].status == 'unknown city') {
                    send.text('未知城市或城市范围太大。')
                }else {
                    send.text(location + '天气（' + json.HeWeather5["0"].basic.update.loc.slice(11) +'数据）\n'
                        + '现在：\n'
                        + json.HeWeather5["0"].now.cond.txt + '，' + json.HeWeather5["0"].now.tmp + '℃，' + '风力' + json.HeWeather5["0"].now.wind.sc + '级，空气质量：' + json.HeWeather5["0"].aqi.city.qlty + '。\n'
                        + '最低气温：' + json.HeWeather5["0"].daily_forecast[0].tmp.min + '℃，最高气温' + json.HeWeather5["0"].daily_forecast[0].tmp.max + '℃。\n'
                        + '明日：\n'
                        + json.HeWeather5["0"].daily_forecast[1].cond.txt_d + '转' + json.HeWeather5["0"].daily_forecast[1].cond.txt_n + '，气温：' + json.HeWeather5["0"].daily_forecast[1].tmp.min + '℃~' + json.HeWeather5["0"].daily_forecast[1].tmp.max + '℃。'
                    );
                }
            });
        }).on('error', function (e) {
            console.log(e);
        });
    }
};