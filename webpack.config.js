const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const Dotenv = require('dotenv-webpack');


module.exports = {
    entry: './src/js/index.js',

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },

    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
        }),

        new CopyWebpackPlugin({
            patterns: [
                { from: 'src/img', to: 'img'},
                { from: 'src/css', to: 'css'}, 
            ]
        }),

        new Dotenv(),
    ],

    devServer: {
        open: true,
        static: path.resolve(__dirname, 'dist'),
    },

    mode: 'production',
}