const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const path  =  require('path');

const  PATHS  =  {
    public:  path.resolve(__dirname,  'src'),
};

module.exports = {
    entry: `${PATHS.public}/main.js`,
    output:  {
        path:  PATHS.public,
        filename:  'bundle.js',
    },

    devtool: 'source-map',

    module: {
        rules: [
            {
                test: /\.js$/,
                use: ['babel-loader'],
                exclude: /node_modules/
            },

            { test: /\.(png|jpg|gif|svg)$/, use: [
                {
                    loader: 'url-loader',
                    options: {
                        mimetype: 'image/png',
                    },
                },
            ]},

            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
                exclude: /node_modules/,
            },

            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
                exclude: /node_modules/,
            },

            {
                test: /\.pug$/,
                loader: 'pug-loader',
            },
        ]
    },

    devServer: {
        contentBase: 'src',
        hot: true,
        open: true,
        port: 8000,
        watchContentBase: true,
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './src/index.html'),
            filename: 'index.html',
        }),
        new Dotenv(),
    ]
};