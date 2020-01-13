const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const merge = require('webpack-merge');
const devConfig = require('./webpack.dev');
const prodConfig = require('./webpack.prod');

const commonCinfig = {
  entry: {
    main: path.join(__dirname, '../src/index.tsx')
  },

  output: {
    filename: '[name]_[hash].js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: '',
  },

  module: {
    rules: [{
      test: /\.(ts|tsx)$/,
      exclude: /node_modules/,
      use: [
        {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', {
                targets: {
                  chrome: '67',
                }
              },
              // {
              //   useBuiltIns: 'usage', //自动引用polyfill
              // }
            ],
              '@babel/preset-react'
            ],
            plugins: [['@babel/plugin-transform-runtime', {
              'corejs': 2,
              'helpers': true,
              'regenerator': true,
              'useEmodules': false,
            }], '@babel/plugin-syntax-dynamic-import']
          }
        },
        {
          loader: 'ts-loader',
        }
      ]
    }, {
      test: /\.(jpg|png|gif)$/,
      use: {
        loader: 'file-loader',
        options: {
          name: '[name]_[hash].[ext]',
          outputPath: 'images/'
        }
      }
    }, {
      test: /\.(eot|woff|ttf|svg)$/,
      use: {
        loader: 'file-loader',
      }
    }
    // {
    //   test: /\.(jpg|png|gif)$/,
    //   use: {
    //     loader: 'url-loader',
    //     options: {
    //       name: '[name]_[hash].[ext]',
    //       outputPath: 'images/',
    //       limit: 2048
    //     }
    //   }
    // }
  ]
  },

  plugins: [
    new CleanWebpackPlugin(),
    // htmlwebpackplugin 会在打包结束后，自动生成一个html文件，并把打包生成的js文件自动引入到这个html中
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '../src/index.html')
    }),
    new webpack.ProvidePlugin({
      _: 'lodash'
    })
  ],

  optimization: {
    // 使用Tree shaking
    // pakeage.json sideEffects: [] 排除使用Tree shaking
    usedExports: true,
    // 代码分割
    splitChunks: {
      chunks: 'all', // async异步分割， 同时分割initial并配合vendors。all同异步
      minSize: 30000, // 引入的组件、包等大于30kb才分割
      // minRemainingSize: 0,
      maxSize: 0,
      minChunks: 1, //至少用了多少次才分割
      maxAsyncRequests: 6, //同时加载数量
      maxInitialRequests: 4, // 入口文件同时加载数量
      automaticNameDelimiter: '~', //文件连接符
      automaticNameMaxLength: 30,
      cacheGroups: {
        vendors: { // 同步，异步vendors: false
          test: /[\\/]node_modules[\\/]/,
          priority: -10, // 值越大越优先打包
          filename: 'vendors.js', //同步打包名称
        },
        default: { //默认分割，非node_modules
          // minChunks: 2,
          priority: -20,
          reuseExistingChunk: true, // 忽略打包过的模块
          filename: 'common.js'
        }
      }
    }
  }
}

module.exports = (env) => {
  if (env && env.prod) {
    return merge(commonCinfig, prodConfig)
  }
  return merge(commonCinfig, devConfig)
}