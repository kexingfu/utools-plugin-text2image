import { join } from "path";
import { platform } from "process";
import { IConfigItem } from "utools-helper";

let defaultPath = "";
switch (platform) {
  case "win32":
    defaultPath = "D:\\text2image_template";
    break;
}

export const config: IConfigItem[] = [
  {
    name: "imagepath",
    label: "本地图片模板存放路径",
    type: "input",
    required: false,
    placeholder: "请输入本地图片模板存放路径",
    default: defaultPath,
    only_current_machine: true,
  },{
    name: "regex",
    label: "文本匹配正则",
    type: "input",
    required: false,
    placeholder: "默认为/(.)*/g ，小心乱改而导致不可用",
    default: "/(.)*/g",
    only_current_machine: true,
  }
];
