"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const process_1 = require("process");
let defaultPath = "";
switch (process_1.platform) {
    case "win32":
        defaultPath = "D:\\text2image_template";
        break;
}
exports.config = [
    {
        name: "imagepath",
        label: "本地图片模板存放路径",
        type: "input",
        required: false,
        placeholder: "请输入本地图片模板存放路径",
        default: defaultPath,
        only_current_machine: true,
    }, {
        name: "imagewidth",
        label: "一行几个字",
        type: "input",
        required: true,
        placeholder: "请输入表情中一行几个字，默认一行8个字",
        default: 8,
        only_current_machine: true,
    }, {
        name: "linespace",
        label: "行间距",
        type: "input",
        required: true,
        placeholder: "请输入文字行间距，默认为字高度的0.3倍",
        default: 0.3,
        only_current_machine: true,
    }, {
        name: "regex",
        label: "文本匹配正则",
        type: "input",
        placeholder: "默认为空（全匹配） ，参考插件详情说明更改",
        default: "",
        only_current_machine: true,
    }
];
