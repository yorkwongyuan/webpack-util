const path = require("path");

let srcPath = path.resolve(__dirname, '../src');

module.exports = {
    context: path.resolve(__dirname, '../'),
    resolve:{
        extension:['js'],
        alias:{
            '@': srcPath
        }
    },
    module:{
        rules:[
            {
                test: /\.js$/,
                include:[srcPath, path.resolve('../example')],
                loader: 'babel-loader'
            }
        ]
    }
}