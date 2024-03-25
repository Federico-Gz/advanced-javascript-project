const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');




module.exports = {
    entry: './src/js/index.js',

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
        })
    ],

    devServer: {
        open: true,
        static: path.resolve(__dirname, 'dist'),
    },

    mode: 'development',
}