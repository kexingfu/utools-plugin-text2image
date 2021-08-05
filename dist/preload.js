"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utools_helper_1 = require("utools-helper");
const config_1 = require("./config");
const text2image_1 = require("./text2image");
try {
    utools.onPluginReady(() => {
        let reg = utools_helper_1.Setting.Get("regex");
        if (reg) {
            utools.removeFeature('转成表情');
            utools.setFeature({
                "code": "转成表情",
                "explain": "图片聊天",
                "icon": "logo.png",
                "platform": ["win32", "darwin", "linux"],
                "cmds": [
                    {
                        "type": "regex",
                        "label": "转成表情",
                        "match": reg,
                        "minLength": 1,
                        "maxLength": 100
                    }
                ]
            });
        }
    });
    utools_helper_1.InitPlugins([new text2image_1.Text2Image('转成表情'), new text2image_1.Text2Image('转成表情-后缀'), utools_helper_1.Setting.Init("text2image-setting", config_1.config)]);
}
catch (error) {
    alert(error.stack ? error.stack : error);
}
