const {
  addLessLoader,
  addDecoratorsLegacy,
  override,
  addWebpackAlias,
} = require("customize-cra");

const path = require('path')
module.exports = override(
  addLessLoader({
    strictMath: true,
    noIeCompat: true,
    //自定义less配置例如antd的自定义
    localIdentName: "[local]--[hash:base64:5]" // if you use CSS Modules, and custom `localIdentName`, default is '[local]--[hash:base64:5]'.
  }),
  //添加装饰器
  addDecoratorsLegacy(),
  //添加别名
  addWebpackAlias({
    "@" : path.resolve(__dirname , "./src/")
  })
);
