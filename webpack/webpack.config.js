const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');

var path = require('path')
var rootPath = path.join(__dirname, '..')
var appPath = path.join(rootPath, 'app')

module.exports = {
  entry:  path.join(appPath, 'main.js'),//已多次提及的唯一入口文件
  output: {
    // path: path.join(rootPath, 'public'),//打包后的文件存放的地方
    path: path.join(rootPath, 'build'),//打包后的文件存放的地方
    filename: "bundle.js"//打包后输出文件的文件名
  },
  module:{
    rules: [
      {
        test: /(\.jsx|\.js)$/,
        use: {
          loader: "babel-loader",
          /*options:{ //这个可以单独放在.babelrc中进行配置
            presets: [
              "env", "react"
            ]
          }*/
        },
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          { loader: "style-loader" }, 
          { 
            loader: "css-loader",
            options: {
              modules: true, // 指定启用css modules
              localIdentName: '[name]__[local]--[hash:base64:5]' // 指定css的类名格式
            }
          },
          { loader: "postcss-loader" }
        ]
      }
    ]
  },
  plugins: [
      require('autoprefixer'),
      // new webpack.BannerPlugin('版权所有，翻版必究')
      new webpack.BannerPlugin({
        banner: "版权所有,翻版必究, hash:[hash], chunkhash:[chunkhash], name:[name], filebase:[filebase], query:[query], file:[file]",
        raw: false
      }),
      new HtmlWebpackPlugin({
          // template: __dirname + "/app/index.tmpl.html"//new 一个这个插件的实例，并传入相关的参数
          template: path.join(appPath, 'index.tmpl.html')
      })
  ],
  devServer:{
    contentBase: path.join(rootPath, 'public'), //本地服务器所加载的页面所在的目录
    historyApiFallback: true,
    inline: true
  }
}