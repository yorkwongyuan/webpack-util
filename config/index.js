const path = require("path");
const {getIp} = require("../build/util");

const distPath = path.resolve(__dirname,"../dist");

let config = {
    build:{
        main:"./src/index",
        assetsRoot:distPath,
        devtool: 'source-map'
    },
    dev: {
        main: "./example/src/index",
        assetsRoot: distPath,
        devtool: 'eval-source-map',
        assetsPublicPath:"/",
        assetsSubDirectory:"",
        host: getIp(),
        port: 8888
    }
}

module.exports = config;