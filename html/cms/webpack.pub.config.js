const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')  //引入html文件处理插件
const ExtractTextPlugin = require("extract-text-webpack-plugin")  //抽取css样式
const CleanPlugin = require("clean-webpack-plugin") //自动删除文件件
const Webpack = require("webpack")

module.exports = {
  entry: {
    app: path.join(__dirname, './src/main.js'),
    vendors1: ["vue", "vuex", "vue-router", "vue2-preview"], //打包时分离js并分类打包
    vendors2: ["axios"],
    vendors3: ["moment"],
    vendors4: ["mint-ui"]
  },
  output: {
    path: path.join(__dirname, './dist'),
    filename: 'bundle.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, './src/index.html'),
      filename: 'index.html',
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeAttributeQuotes: true
      }
    }),
    new ExtractTextPlugin("css/styles.css"),
    new CleanPlugin(["dist"]),
    new Webpack.optimize.UglifyJsPlugin(), //优化压缩js文件
    new Webpack.optimize.CommonsChunkPlugin({ //分离js
      name: ["vendors1", "vendors2", "vendors3", "vendors4"],
      filename: "js/[chunkhash:6]-vendors.js"
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/, use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
      },
      {
        test: /\.scss$/, use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ["css-loader", "sass-loader"]
        })
      },
      { test: /\.jpg|png|gif|bmp$/, use: ['url-loader?name=[name].[ext]&limit=1'] },
      { test: /\.js$/, use: ['babel-loader'], exclude: /node_modules/ },
      { test: /\.vue/, use: 'vue-loader' },
      { test: /\.ttf|eot|svg|woff|woff2$/, use: 'url-loader' }
    ]
  }
}