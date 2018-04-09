const webpack = require('webpack');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin")
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin"); // 仅在webpack 1-3 可用  webpack4已经废弃
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin')

var path = require('path')
var rootPath = path.join(__dirname, '..')
var appPath = path.join(rootPath, 'app')

module.exports = {
  entry: path.join(appPath, '/main.js'), //已多次提及的唯一入口文件
  output: {
    path: path.join(rootPath, 'build'),
    filename: "bundle-[hash:8].js"
  },
  module: {
    rules: [{
      test: /(\.jsx|\.js)$/,
      use: {
        loader: "babel-loader"
      },
      exclude: /node_modules/
    }, {
      test: /\.css$/,
      use: [
        MiniCssExtractPlugin.loader,
        "css-loader"
      ]
    }]
  },
  plugins: [
    new webpack.BannerPlugin('版权所有，翻版必究'),
    // new ExtractTextPlugin('styles.css'),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "[name].css",
      chunkFilename: "[id].css"
    }),
    new HtmlWebpackPlugin({
      template: path.join(appPath, 'index.tmpl.html')
    }),
    new webpack.HotModuleReplacementPlugin(), //热加载插件
    new CleanWebpackPlugin('build/*.*', {
      // root: __dirname,
      root: rootPath,
      verbose: true,
      dry: false
    })
  ],
  /*optimization: {
    splitChunks: {
      cacheGroups: {
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',
          enforce: true
        }
      }
    },
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true // set to true if you want JS source maps
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  },*/
  devtool: 'null', //注意修改了这里，这能大大压缩我们的打包代码
  devServer: {
    contentBase: path.join(rootPath, 'public'),
    historyApiFallback: true, //不跳转
    inline: true,
    hot: true
  },
};

/*
    注意 extract-text-webpack-plugin 这个插件在webpack的版本大于4后被抛弃  可以用mini-css-extract-plugin代替
*/