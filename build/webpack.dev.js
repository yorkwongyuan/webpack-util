const env = require("../config/dev.env");
const path = require('path');
const config = require("../config").dev;
const webpack = require("webpack");
const merge = require("webpack-merge");
const htmlWebpackPlugin = require("html-webpack-plugin");
const webpackCommon = require("./webpack.common");
process.NODE_ENV = env;
module.exports = merge(common,{
    entry:config.main,
    output:{
        path:config.assetsRoot,
        // filename:config.
    }
})