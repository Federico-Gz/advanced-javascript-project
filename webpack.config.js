const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');



module.exports = {
    entry: './src/js/index.js',

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },

    module: { rules: [
        {
            test: /\.css$/i,
            use: ['style-loader', 'css-loader'],
        },

       
    ]},

    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
        }),

        new CopyWebpackPlugin({
            patterns: [
                { from: 'src/img', to: 'img'},  
            ]
        })
    ],

    devServer: {
        open: true,
        static: path.resolve(__dirname, 'dist'),
    },

    mode: 'development',
}