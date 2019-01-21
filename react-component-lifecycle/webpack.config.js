const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'build-[hsah:5].js',
        path: path.resolve(__dirname, 'dist')
    },
    mode: "development",
    devtool: 'inline-source-map',
    devServer: {
        hot: true,
        contentBase: './public',
        clientLogLevel: 'none',
        quiet: true,
    },
    stats: "errors-only",
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(css|less|scss)$/,
                exclude: /node_modules/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            }
        ]
    },
    plugins: [
        new HTMLWebpackPlugin({ template: './public/index.html' }),
        new CleanWebpackPlugin(['dist']),
        new webpack.HotModuleReplacementPlugin()
    ]
}