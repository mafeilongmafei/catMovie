/**
 @Author：Wyunfei
 @Date：2019/3/26/16:14
 @FileName: setupProxy.js
 */
const proxy = require("http-proxy-middleware");

module.exports = function(app) {
 
   app.use(
     proxy("/api", {
       target: "http://39.97.33.178", //配置你要请求的服务器地址
       changeOrigin: true
     }),
     proxy("/ajax", {
       target: "http://m.maoyan.com", //配置你要请求的服务器地址
       changeOrigin: true
     })
   );
 
 
};
