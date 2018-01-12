var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, './bundle/');
var APP_DIR = path.resolve(__dirname, './');

var config = {
  entry: ["whatwg-fetch", "babel-polyfill", "./index.js"],
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  },
  module : {
    loaders : [
      {
        test : /\.js?/,
        include : APP_DIR,
        loader : 'babel-loader'
      }
    ]
  }
};

module.exports = config;