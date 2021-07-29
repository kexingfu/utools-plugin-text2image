import { InitPlugins, Setting } from "utools-helper";
import { config } from "./config";
import { Text2Image } from "./text2image";

try {
  InitPlugins([new Text2Image(), Setting.Init("text2image-setting", config)]);
} catch (error) {
  alert(error.stack ? error.stack : error);
}
