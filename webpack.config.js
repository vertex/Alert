var path = require("path");
var FlowBabelWebpackPlugin = require("flow-babel-webpack-plugin");

module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: "style-loader" // creates style nodes from JS strings
          },
          {
            loader: "css-loader" // translates CSS into CommonJS
          },
          {
            loader: "sass-loader" // compiles Sass to CSS
          }
        ]
      }
    ]
  },
  devtool: "source-map",
  entry: "./webapp/index.js",
  devServer: {
    contentBase: "./public/"
  },
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "app.js"
  },
  plugins: [new FlowBabelWebpackPlugin()]
};
