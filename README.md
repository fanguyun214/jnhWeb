# jnhWeb
前端单页应用框架
框架结构：requireJS+roter+template+zepto+r.js+nodeJS
框架实现：ruter+template实现单页按需加载，减少URL重定向跳转，提高加载性能，requireJS实现模块化依赖加载，r.js+nodeJS实现代码压缩
框架结构：
 
Index.html：主页面
Style：样式文件
Script：JS文件（app各模块JS，lib库文件）
Images：图片文件
Build：为打包压缩后代码
框架代码逻辑：
进入页面根据URL#id，根据id只router做按需加载，template实现不同页面提取加载，zepto作为辅助库
