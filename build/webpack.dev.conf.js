const env = require("../config/dev.env");
const path = require('path');
const config = require("../config").dev;
const webpack = require("webpack");
const merge = require("webpack-merge");
const htmlWebpackPlugin = require("html-webpack-plugin");
const friendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");
const webpackCommon = require("./webpack.common");
const webpackDevServer = require("webpack-dev-server");
const ora = require("ora");
process.NODE_ENV = env;

let webpackDev = merge(webpackCommon, {
    mode: "development",
    entry: config.main,
    output: {
        path: config.assetsRoot,
        filename: path.join(config.assetsSubDirectory, 'js/[name].js'),
        chunkFilename: path.join(config.assetsSubDirectory, 'js/[name].js'), // require.ensure()方法引入的才会被打包
        publicPath: config.assetsPublicPath // html引入js的时候的路径
    },
    devtool: config.devtool,
    module: {
        rules: [
            {
                test: /\.css$/,
                exclude: /node_modules/,
                loader: 'style-loader!css-loader!postcss-loader',
            },
            {
                test: /\.(scss|sass)/,
                exclude: /node_modules/,
                use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
            }, {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/, // ?
                loader: "url-loader",
                options: {
                    limit: 1024 * 10, // 10kb
                    name: path.join(config.assetsSubDirectory, "img/[name].[ext]")
                }
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': config.env,
        }),
        new friendlyErrorsWebpackPlugin({
            compilationSuccessInfo: `Your application is runing here: http://${config.host}:${config.port}`
        }),
        new htmlWebpackPlugin({
            filename: 'index.html',
            template: path.resolve(__dirname, '../example/index.html'),
            inject: true
        })
    ]
});

let compiler = webpack(webpackDev);

// 提示信息(绿色)
const spliner = ora("项目构建中...").start();
spliner.color = 'green';

let server = new webpackDevServer(compiler, {
    quiet: true,
    host: config.host,
    port: config.port
});
console.log("asdf")
server.listen(config.port, config.host, function () {
    console.log('Starting dev server...')
    spliner.stop()
});



