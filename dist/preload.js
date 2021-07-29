"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utools_helper_1 = require("utools-helper");
const config_1 = require("./config");
const text2image_1 = require("./text2image");
try {
    utools_helper_1.InitPlugins([new text2image_1.Text2Image(), utools_helper_1.Setting.Init("text2image-setting", config_1.config)]);
}
catch (error) {
    alert(error.stack ? error.stack : error);
}
