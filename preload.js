const fs = require('fs');
const path = require('path');
const join = require('path').join;
const PinyinMatch = require('pinyin-match');

var filePaths = []
var fileNames = []
var setList = []
//获取目录下所有图片
function findSync(startPath) {
  let result=[];
  function finder(path) {
      let files=fs.readdirSync(path);
      files.forEach((val,index) => {
          let fPath=join(path,val);
          let stats=fs.statSync(fPath);
          if(stats.isDirectory()) finder(fPath);
          if(stats.isFile()) result.push(fPath);
      });
  }
  finder(startPath);
  return result;
}

window.exports = {
    "转成表情": { // 注意：键对应的是 plugin.json 中的 features.code
       mode: "list",  // 用于无需 UI 显示，执行一些简单的代码
       args: {
          // 进入插件时调用
          enter: (action, callbackSetList) => {
            // 如果进入插件就要显示列表数据
            filePaths = findSync(path.join(__dirname, 'imgs/'))
            fileNames = filePaths.map(v => v.split('\\').slice(-1)[0]);
            setList = fileNames.map((v,i)=>{return {title:v.slice(0,-4), url:filePaths[i], icon: 'imgs/' + filePaths[i].split('imgs').slice(-1)[0].substring(1)}})
            callbackSetList(setList)
         },
           search: (action, searchWord, callbackSetList) => {
            // 获取一些数据
            // 执行 callbackSetList 显示出来
            if (!searchWord) return callbackSetList(setList)
            callbackSetList(setList.filter(x => PinyinMatch.match(x.title, searchWord)))
         },         
         select: (action, itemData, callbackSetList) => {
            utools.hideMainWindow()
            var text = itemData.other? itemData.other: action.payload
            filePath = itemData.url
            file = fs.readFileSync(filePath); //读取文件

            var img = new Image();
            img.src = "data:image/jpeg;base64," + file.toString('base64');
            img.onload = ()=>{
                var fontSize = 18;/*文字大小*/
                var len = Math.round((img.width)/fontSize);/*文字长度*/
                var i = 0;
                var fontWeight = 'normal';/*normal正常;bold粗*/
                var txt = text;
                var canvas = document.createElement("canvas");
                var leftField = 3
                if (len > txt.length) {
                    len = txt.length;
                }
                canvas.width = fontSize * len;
                canvas.height = fontSize * (3 / 2)
                        * (Math.ceil(txt.length / len) + txt.split('\n').length - 1);
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
                function fillTxt(text) {
                    while (text.length > len) {
                        var txtLine = text.substring(0, len);
                        text = text.substring(len);
                        context.fillText(txtLine, (canvas.width-2*leftField)/2, img.height+fontSize * (3 / 2) * i++,
                                canvas.width-2*leftField);
                    }
                    context.fillText(text, (canvas.width-2*leftField)/2, img.height+fontSize * (3 / 2) * i, canvas.width- leftField);
                }
                var txtArray = txt.split('\n');
                for (var j = 0; j < txtArray.length; j++) {
                    fillTxt(txtArray[j]);
                    context.fillText('\n', (canvas.width-2*leftField)/2, img.height+fontSize * (3 / 2) * i++, canvas.width-leftField);
                }
                utools.copyImage(canvas.toDataURL("image/png"))
                if (utools.isMacOs()) {
                    utools.simulateKeyboardTap('v', 'command')
                  }else{
                    utools.simulateKeyboardTap('v', 'ctrl')
                  }
                utools.outPlugin()
         } 
       } ,placeholder: "搜索"
    }}
 }


