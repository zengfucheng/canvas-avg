const path = require('path');

const glob = require('glob');
const webpack = require('webpack');
const spritesmithPlugin = require('webpack-spritesmith');
const miniCssExtractPlugin = require('mini-css-extract-plugin');
const cleanWebpackPlugin = require('clean-webpack-plugin');
const htmlWebpackPlugin = require('html-webpack-plugin');
const copyWebpackPlugin = require('copy-webpack-plugin');

// 雪碧图打包代码
const newSprite = require('./webpack.sprite')();

module.exports = {
    devServer: {
        contentBase: '/',
        historyApiFallback: true,
        hot: true,
        // hotOnly: true,                      //只热更新，意思就是 禁止自动刷新页面
        inline: true,                       //必须，实时刷新。不配置的话，不生效热更
        host: 'localhost',
        port: 8080
    },
    entry: {
        app: path.resolve(__dirname,'../','src/index.js')
    },
    plugins: [
        new cleanWebpackPlugin(['dist'],{
            root: path.resolve(__dirname,'../'),        //目录路径
            exclude: '',                                //删除列外（不删除的内容）
            verbose: true,                              //在控制台，输出信息
            dry: false                                  //是否删除文件，目前 是
        }),
        new webpack.ProvidePlugin({                     //设置全局变量，调用第三方库（需提前安装好第三方）
            $: 'jquery',
            jQuery: 'jquery'
        }),
        new htmlWebpackPlugin({
            template: path.resolve(__dirname, '../', 'src/view/index.html')
        }),
        new webpack.BannerPlugin('版权所有，翻版必究'),          //版权
        new copyWebpackPlugin([                                 //复制文件夹，处理静态资源用
            {
                from: path.resolve(__dirname, '../', 'src/assets'),
                to: path.resolve(__dirname, '../', 'dist/assets')
            }
        ])
    ],
    module: {
        rules: [
            {
                test: /\.png$/,
                use: [
                    'url-loader'
                ]
            },
            {
                test: /\.(jpg|jpeg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8129,
                            outputPath: './images'
                        }
                    }
                ]
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: [
                    'babel-loader'
                ]
            },
            {
                test: /\.(c|sc|sa)ss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'postcss-loader',
                    'sass-loader'
                ]
            }
        ]
    }
}

// 雪碧图打包插件，加入打包总插件，进行打包
newSprite.forEach( (v) => {
    module.exports.plugins.push(v);
});

