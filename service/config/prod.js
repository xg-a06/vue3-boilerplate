'use strict'
const webpack = require('webpack')
const merge = require('webpack-merge')
const PreloadPlugin = require('preload-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')

const baseWebpackConfig = require('./base')
const cssWebpackConfig = require('./css')
const config = require('../project.config')
const terserOptions = require('./terserOptions')

module.exports = merge(baseWebpackConfig, cssWebpackConfig, {
  mode: 'production',

  output: {
    publicPath: config.build.publicPath,
  },

  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin(terserOptions())],
    splitChunks: {
      cacheGroups: {
        defaultVendors: {
          name: `chunk-vendors`,
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          chunks: 'initial',
        },
        common: {
          name: `chunk-common`,
          minChunks: 2,
          priority: -20,
          chunks: 'initial',
          reuseExistingChunk: true,
        },
      },
    },
  },

  plugins: [
    // new PreloadPlugin({
    //   rel: 'preload',
    //   include: 'initial',
    //   fileBlacklist: [/\.map$/, /hot-update\.js$/],
    // }),
    // new PreloadPlugin({
    //   rel: 'prefetch',
    //   include: 'asyncChunks',
    // }),
    // new webpack.HashedModuleIdsPlugin({
    //   hashDigest: 'hex',
    // }),
  ],
})