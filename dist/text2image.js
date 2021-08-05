"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Text2Image = exports.STORAGE = void 0;
const utools_helper_1 = require("utools-helper");
const fs = require('fs');
const path = require('path');
const join = require('path').join;
const PinyinMatch = require('pinyin-match');
exports.STORAGE = "vscode_storage";
class Text2Image {
    constructor(code) {
        this.code = "转成表情";
        this.setList = [];
        this.code = code;
    }
    get imagepath() {
        if (!this._imagepath)
            this._imagepath = utools_helper_1.Setting.Get("imagepath");
        return this._imagepath;
    }
    get regex() {
        if (!this._regex)
            this._regex = utools_helper_1.Setting.Get("regex");
        return this._regex;
    }
    async enter() {
        let customFilePaths = [];
        try {
            customFilePaths = this.findSync(this.imagepath);
        }
        catch (error) {
        }
        let defaultfilePaths = this.findSync(path.join(__dirname, 'imgs/'));
        let filePaths = customFilePaths.concat(defaultfilePaths);
        let fileNames = filePaths.map(v => v.split(utools.isMacOs() ? '/' : '\\').slice(-1)[0]);
        let defaultSetList = fileNames.map((v, i) => { return { title: v.split(".")[0], url: filePaths[i], icon: "file:///" + filePaths[i], description: null, data: null }; });
        this.setList = defaultSetList;
        return this.setList;
    }
    findSync(startPath) {
        let result = [];
        function finder(path) {
            let files = fs.readdirSync(path);
            files.forEach((val, index) => {
                let fPath = join(path, val);
                let stats = fs.statSync(fPath);
                if (stats.isDirectory())
                    finder(fPath);
                if (stats.isFile())
                    result.push(fPath);
            });
        }
        finder(startPath);
        return result;
    }
    async search(searchWord) {
        if (!searchWord)
            return this.setList;
        return this.setList.filter(x => PinyinMatch.match(x.title, searchWord));
    }
    select(itemData, action) {
        utools.hideMainWindow();
        var text = action.payload;
        let filePath = itemData.url;
        let file = fs.readFileSync(filePath); //读取文件
        var reg = eval(this.regex);
        text = reg.exec(text)[0];
        //text = text.match(this.regex)[0]
        var img = new Image();
        img.src = "data:image/jpeg;base64," + file.toString('base64');
        img.onload = () => {
            var fontSize = 18; /*文字大小*/
            var len = Math.round((img.width) / fontSize); /*文字长度*/
            var i = 0;
            var fontWeight = 'normal'; /*normal正常;bold粗*/
            var txt = text;
            var canvas = document.createElement("canvas");
            var leftField = 3;
            if (len > txt.length) {
                len = txt.length;
            }
            canvas.width = fontSize * len;
            canvas.height = fontSize * (3 / 2)
                * (Math.ceil(txt.length / len) + txt.split('\n').length - 1);
            canvas.width = img.width;
            canvas.height = img.height + canvas.height;
            var context = canvas.getContext('2d');
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.fillStyle = "#FFFFFF";
            context.fillRect(0, 0, canvas.width, canvas.height);
            context.drawImage(img, 0, 0);
            context.fillStyle = '#000000'; /*文字颜色*/
            context.font = fontWeight + ' ' + fontSize + 'px 微软雅黑';
            context.textBaseline = 'top';
            context.textAlign = 'center';
            canvas.style.display = 'none';
            function fillTxt(text) {
                while (text.length > len) {
                    var txtLine = text.substring(0, len);
                    text = text.substring(len);
                    context.fillText(txtLine, (canvas.width - 2 * leftField) / 2, img.height + fontSize * (3 / 2) * i++, canvas.width - 2 * leftField);
                }
                context.fillText(text, (canvas.width - 2 * leftField) / 2, img.height + fontSize * (3 / 2) * i, canvas.width - leftField);
            }
            var txtArray = txt.split('\n');
            for (var j = 0; j < txtArray.length; j++) {
                fillTxt(txtArray[j]);
                context.fillText('\n', (canvas.width - 2 * leftField) / 2, img.height + fontSize * (3 / 2) * i++, canvas.width - leftField);
            }
            utools.copyImage(canvas.toDataURL("image/png"));
            if (utools.isMacOs()) {
                utools.simulateKeyboardTap('v', 'command');
            }
            else {
                utools.simulateKeyboardTap('v', 'ctrl');
            }
            utools.outPlugin();
        };
    }
}
exports.Text2Image = Text2Image;
