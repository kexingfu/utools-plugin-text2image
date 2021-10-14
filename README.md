可将文字转成图片(表情)，让你在斗图中立于不败之地，实在是居家旅行（浪费流量）必备插件；结合超级面板使用体验极佳（在聊天框内选中文本，打开超级面板，直接转为表情！）

utools框输入 "图片聊天-配置" 可配置本地图片模板路径，可在其中放入自己喜欢的图片(jpg/png)作为模板，win下默认为D:\text2image_template。

自定义正则可以让插件在需要时弹出而不是输任意文本都弹出，在utools框输入 "图片聊天-配置" 可配置，示例正则：

【带“bq”前缀】：/(?<=^bq)(.)*/g 如 “bq啦啦啦” ，会触发插件，选模板后匹配出“啦啦啦”

【带“bq”后缀】：/(.)*(?=bq$)/g 如 “啦啦啦bq” ，会触发插件，选模板后匹配出“啦啦啦”

注：
1、该配置项留空即表示匹配所有字符（默认）。
2、不能使用任意匹配正则（例如：/.*/ 、/(.)+/、/[\s\S]*/ ... ）。
3、如果utools卡死，输入条变白，可能是正则有错误，请检查前后是否有空格之类的。

更改配置后需完全退出插件后再次进入插件（进配置页面也可以）才能生效！！

![image](./yanshi.gif)

添加表情模板：把图片调整好分辨率后放入imgs文件夹

### 更新日志
v0.0.7 & v0.0.8
1. 修复由于uTools 2.2.1版本后正则通用匹配失效，而导致的插件不可用的问题

v0.0.6
1. 文字大小改为根据分辨率自动调整，优化默认字体大小和行间距
2. 支持自定义单行文字个数、行间距

v0.0.5
1. 支持用户自定义正则表达式用于匹配文本（如让插件在需要时弹出而不是输任意文本都弹出）

v0.0.4
1. ts重构
2. 增加本地配置图片模板的功能

v0.0.2 

 感谢@zhh904208603
1. 兼容MacOS
2. 添加更多表情模板
