import { InitPlugins, Setting } from "utools-helper";
import { config } from "./config";
import { Text2Image } from "./text2image";



try {
  utools.onPluginReady(() => {
    let reg = Setting.Get("regex");
    if(reg){
      utools.removeFeature('转成表情')
      utools.setFeature({
        "code": "转成表情",
        "explain": "图片聊天",
          "icon": "logo.png",
          "platform": ["win32", "darwin", "linux"],
        "cmds": [
            {
                "type": "regex",
                "label": "转成表情",
                "match":  reg ,
                "minLength": 1,
                "maxLength": 100
            }
        ]
    })
    }
  })
  
  InitPlugins([new Text2Image('转成表情'), new Text2Image('转成表情-后缀'), Setting.Init("text2image-setting", config)]);
} catch (error) {
  alert(error.stack ? error.stack : error);
}
