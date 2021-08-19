import { Plugin, ListItem, Setting } from "utools-helper";
import { Action } from "utools-helper/dist/template_plugin";
const fs = require('fs');
const path = require('path');
const join = require('path').join;
const PinyinMatch = require('pinyin-match');

export const STORAGE = "vscode_storage";

export class Text2Image implements Plugin {
  code = "转成表情";
  _imagepath: string;
  _imagewidth: string; 
  _linespace: number;
  _regex: string;
  setList :ListItem[]= [];

  constructor(code:string) {
    this.code = code
  }

  get imagepath(): string {
    if (!this._imagepath) this._imagepath = Setting.Get("imagepath");
    return this._imagepath;
  }

  get imagewidth(): string {
    if (!this._imagewidth) this._imagewidth = Setting.Get("imagewidth");
    return this._imagewidth;
  }

  get linespace(): number {
    if (!this._linespace) this._linespace = Number(Setting.Get("linespace"));
    return this._linespace;
  }

  get regex(): string {
    if (!this._regex) this._regex = Setting.Get("regex");
    return this._regex;
  }

  async enter(): Promise<ListItem[]> {
    let customFilePaths:string[] = []
    try {
      customFilePaths = this.findSync(this.imagepath)
    } catch (error) {
    }
    let defaultfilePaths = this.findSync(path.join(__dirname, 'imgs/'))
    let filePaths = customFilePaths.concat(defaultfilePaths)
    let fileNames = filePaths.map(v => v.split(utools.isMacOs()?'/':'\\').slice(-1)[0]);
    let defaultSetList = fileNames.map((v,i)=>{return {title:v.split(".")[0], url:filePaths[i], icon: "file:///" + filePaths[i], description:null ,data:null}})
    this.setList = defaultSetList
    return this.setList
  }

  findSync(startPath: string) {
    let result:string[] = [];
    function finder(path :string) {
        let files=fs.readdirSync(path);
        files.forEach((val:string,index:number) => {
            let fPath=join(path,val);
            let stats=fs.statSync(fPath);
            if(stats.isDirectory()) finder(fPath);
            if(stats.isFile()) result.push(fPath);
        });
    }
    finder(startPath);
    return result;
  }

  async search(searchWord?: string): Promise<ListItem[]> {
    if (!searchWord) return this.setList
    return this.setList.filter(x => PinyinMatch.match(x.title, searchWord))
  }

  select(itemData: ListItem,action:Action) {
    utools.hideMainWindow()
    var text = action.payload
    let filePath = itemData.url
    let file = fs.readFileSync(filePath); //读取文件

    var reg = eval(this.regex)
    text = reg.exec(text)[0]
    //text = text.match(this.regex)[0]

    var img = new Image();
    img.src = "data:image/jpeg;base64," + file.toString('base64');
    img.onload = ()=>{
        // var fontSize = 18;/*文字大小*/
        // var len = Math.round((img.width)/fontSize);/*文字长度*/
        var len = parseInt(this.imagewidth);/*文字长度*/
        var fontSize = Math.round((img.width)/len);/*文字大小*/
        
        var i = 0;
        var fontWeight = 'normal';/*normal正常;bold粗*/
        var txt = text;
        var canvas = document.createElement("canvas");
        var leftField = 3
        var linespace = this.linespace
        if (len > txt.length) {
            len = txt.length;
        }
        canvas.width = fontSize * len;
        canvas.height = fontSize * (1 + linespace)
                * (Math.ceil(txt.length / len) + txt.split('\n').length - 1) + fontSize * linespace;
        canvas.width = img.width
        canvas.height = img.height+canvas.height
        var context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.fillStyle="#FFFFFF";
        context.fillRect(0,0,canvas.width,canvas.height);
        context.drawImage(img,0,0)
        context.fillStyle = '#000000';/*文字颜色*/
        context.font = fontWeight + ' ' + fontSize + 'px 微软雅黑';
        context.textBaseline = 'top';
        context.textAlign = 'center'
        canvas.style.display = 'none';
        function fillTxt(text:string) {
            while (text.length > len) {
                var txtLine = text.substring(0, len);
                text = text.substring(len);
                context.fillText(txtLine, (canvas.width-2*leftField)/2, img.height+fontSize * linespace + fontSize * (1 + linespace) * i++,
                        canvas.width-2*leftField);
            }
            context.fillText(text, (canvas.width-2*leftField)/2, img.height+fontSize * linespace + fontSize * (1 + linespace) * i, canvas.width- leftField);
        }
        var txtArray = txt.split('\n');
        for (var j = 0; j < txtArray.length; j++) {
            fillTxt(txtArray[j]);
            context.fillText('\n', (canvas.width-2*leftField)/2, img.height+fontSize * linespace + fontSize * (1 + linespace) * i++, canvas.width-leftField);
        }
        utools.copyImage(canvas.toDataURL("image/png"))
        if (utools.isMacOs()) {
            utools.simulateKeyboardTap('v', 'command')
          }else{
            utools.simulateKeyboardTap('v', 'ctrl')
          }
        utools.outPlugin()
  }
}}
