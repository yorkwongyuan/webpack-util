const webpack = require("webpack");
const merge = require("webpack-merge");
const path = require("path");
const WebpackParallelUglifyPlugin = require("webpack-parallel-uglify-plugin");
const bundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const ora = require("ora");
const chalk = require("chalk");
const config = require("../config").build
const env = require("../config/prod.env");
const webpackCommon = require("./webpack.common");
const htmlWebpackPlugin = require("html-webpack-plugin")

process.env.NODE_ENV = env.NODE_ENV;

const prodWebpack = merge(webpackCommon, {
    mode:"production",
    entry: config.main,
    output: {
        path: config.assetsRoot,
        filename: '[chunkhash].min.js',
        library: {
            root: "York",
            amd: "Yorkd",
            commonjs: "Yorkc"
        },
        libraryTarget: "umd",
        libraryExport: "default"
    },
    devtool: config.devtool,
    plugins: [
        new webpack.DefinePlugin({
            'process.env': env
        }),
        new webpack.HashedModuleIdsPlugin(),
        new WebpackParallelUglifyPlugin({
           cacheDir:"node_modules/.uglify-cache",
           sourceMap: true,
           output: {
               comments: false,
               beautify: true
           },
           compress:{
                warnings: false,
                drop_console: true,
                collapse_vars: true,
                reduce_vars: true 
           }
        }),
        new webpack.optimize.ModuleConcatenationPlugin(), // 连接
        new bundleAnalyzerPlugin({
            analyzerHost: '127.0.0.1',
            analyzerPort: 3000,
            openAnalyzer: false // 默认浏览器中打开
        }),
        new htmlWebpackPlugin({
            template:path.resolve(__dirname, '../src/index.html'),
            filname:"index.html",
            inject:true
        })
    ]
});

let spinner = ora("项目构建中...").start();

spinner.color = 'green';

webpack(prodWebpack, (err, status) => {
    if(err) throw err;
    spinner.stop();
    process.stdout.write(status.toString({
        color: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
    }) + '\n\n');

    if(status.hasErrors()){
        console.log('构建失败,出现错误.\n');
        process.exit(1)
    }

    console.log(chalk.cyan('构建完成.\n'));
    console.log(chalk.yellow('打包后的代码保存在dist下.\n'));

})