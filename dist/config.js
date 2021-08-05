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
        name: "regex",
        label: "文本匹配正则",
        type: "input",
        required: false,
        placeholder: "默认为/(.)*/g ，小心乱改而导致不可用",
        default: "/(.)*/g",
        only_current_machine: true,
    }
];
