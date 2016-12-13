var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var extractTextPlugin = new ExtractTextPlugin("./[name].css");
var root = path.resolve(__dirname);

module.exports = {
    plugins: [
      extractTextPlugin
    ],
    entry: {
        InfoBox : './src/js/InfoBox',
    },
    output: {
        path: './dist',
        filename: '[name].js'
    },
    module: {
       loaders: [
            {
              test: /\.js|jsx$/,
              exclude: /node_modules/,
              loader: 'babel'
            },
            {
              test: /\.css$/,
              exclude: /node_modules/,
              loaders: ["style-loader", "css-loader"]
            },
            {
              test: /\.less$/,
              exclude: /node_modules/,
              loaders: ["style-loader", "css-loader", "less-loader"]
            },
            {
              test: /\.(png|jpg)$/,
              exclude: /node_modules/,
              loader: 'url-loader'
            },
            {
              test   : /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
              exclude: /node_modules/,
              loader : 'file-loader?name=../style/[name].[ext]'
            }
        ]
    },
    resolve: {
        alias: {
            JS: root+'/src/js',
            LESS: root+'/src/less',
        },
        extensions: ['', '.js', '.json', '.less']
    }
};
