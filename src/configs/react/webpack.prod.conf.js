var webpack = require('webpack');
var merge = require('webpack-merge');
var baseConfig = require('./webpack.base.conf');
var cssLoaders = require('./../../libs/css-loaders');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

// whether to generate source map for production files.
// disabling this can speed up the build.
var SOURCE_MAP = true;

baseConfig.module.loaders = baseConfig.module.loaders.concat(cssLoaders({
  sourceMap: SOURCE_MAP,
  extract: true
}));

module.exports = merge(baseConfig, {
  devtool: SOURCE_MAP ? '#source-map' : false,
  output: {
    // naming output files with hashes for better caching.
    // dist/index.html will be auto-generated with correct URLs.
    filename: '[name].[chunkhash:8].js',
    chunkFilename: '[id].[chunkhash:8].js'
  },
  plugins: [
    // http://vuejs.github.io/vue-loader/workflow/production.html
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    // extract css into its own file
    new ExtractTextPlugin('[name].[contenthash:8].css')
  ]
});
