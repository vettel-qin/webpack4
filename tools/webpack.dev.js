const webpack = require('webpack');
// const merge = require('webpack-merge');
// const commonConfig = require('./webpack.common');

const devConfig = {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map', //开发用
  // devtool: 'cheap-module-source-map', // 打包用

  module: {
    rules: [
      {
        test: /\.(scss|css)$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              modules: true,
            }
          },
          'sass-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: [require('autoprefixer')]
            }
          }
        ]
      }
    ]
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin({}),
  ],

  devServer: {
    contentBase: '../dist', // 服务器启在哪里
    hot: true,
    hotOnly: true, // hot不生效也不自动刷新
    // historyApiFallback: true, // BrowserRoute时使用
    // 代理多路径
    // proxy: [{
    //   context: ['/auth', '/api'],
    //   target: 'http://wx-test.by-health.com'
    // }]

    proxy: {
      '/react/api': {
        target: 'http://www.dell-lee.com',
        secure: false, // https时设置才能转发
        pathRewrite: { // 重写接口， demo.json为临时，header.json为正式
          'header.json': 'demo.json',
        },
        changeOrigin: true,
      }
    }
  }
}

// module.exports = merge(commonConfig, devConfig);
module.exports = devConfig;