/**
 * Created by Romy on 2017/2/27.
 */
createMenu(function () {
    console.log('菜单配置发送成功！');
});

function createMenu(callback) {
    getToken(function (token) {
        console.log('准备发送菜单配置，token为：' + token);
        var options = {
            hostname: 'api.weixin.qq.com',
            path: '/cgi-bin/menu/create?access_token=' + token,
            method: 'POST',
            headers:{
                "button": [
                    {
                        "name": "菜单1",
                        "sub_button": [
                            {
                                "type": "scancode_waitmsg",
                                "name": "子菜单1",
                                "key": "rselfmenu_0_0",
                                "sub_button": [ ]
                            },
                            {
                                "type": "scancode_push",
                                "name": "子菜单2",
                                "key": "rselfmenu_0_1",
                                "sub_button": [ ]
                            }
                        ]
                    },
                    {
                        "name": "菜单2",
                        "sub_button": [
                            {
                                "type": "pic_sysphoto",
                                "name": "子菜单1",
                                "key": "rselfmenu_1_0",
                                "sub_button": [ ]
                            },
                            {
                                "type": "pic_photo_or_album",
                                "name": "子菜单2",
                                "key": "rselfmenu_1_1",
                                "sub_button": [ ]
                            },
                            {
                                "type": "pic_weixin",
                                "name": "子菜单3",
                                "key": "rselfmenu_1_2",
                                "sub_button": [ ]
                            }
                        ]
                    },
                    {
                        "name": "菜单3",
                        "type": "location_select",
                        "key": "rselfmenu_2_0"
                    },
                    {
                        "type": "media_id",
                        "name": "子菜单1",
                        "media_id": "MEDIA_ID1"
                    },
                    {
                        "type": "view_limited",
                        "name": "子菜单2",
                        "media_id": "MEDIA_ID2"
                    }
                ]
            }
        };
        var req = https.request(options, function (res) {
            console.log('开始发送菜单配置...');
            console.log('statuscode:', res.statusCode);
            console.log('headers:', res.headers);
            res.on('data', function (d) {
                console.log(JSON.parse(d));
                callback(null);
            });
        });
        req.on('error', function (e) {
            console.error(e)
        });
        req.end();
    });
}