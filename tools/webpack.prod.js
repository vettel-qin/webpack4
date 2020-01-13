const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin  = require('optimize-css-assets-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin')
// const commonConfig = require('./webpack.common');
// const merge = require('webpack-merge');

const prodConfig = {
  mode: 'production',
  // devtool: 'cheap-module-source-map', //开发用
  devtool: 'cheap-module-source-map', // 打包用
  module: {
    rules: [
      {
        test: /\.(scss|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
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
  // optimization: {
  //   splitChunks: {
  //     cacheGroups: {
  //       styles: {
  //         name: 'style',
  //         test: /\.css$/,
  //         chunks: 'all',
  //         enforce: true
  //       }
  //     }
  //   }
  // },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[name].chunk.css'
    }),
    new OptimizeCssAssetsPlugin({
    }),
    // new WorkboxPlugin.GennerateSW({
    //   clientsClaim: true,
    //   skipWaition: true,
    // })
  ],
}

// module.exports = merge(commonConfig, prodConfig);
module.exports = prodConfig;