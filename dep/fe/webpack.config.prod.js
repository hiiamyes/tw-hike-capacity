var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: [
    './src/index.js'
  ],
  output: {
    path: path.join(__dirname, 'build'),
    filename: '[hash].bundle.js',
    publicPath: '/'
  },
  postcss: function () {
    return [
      require('autoprefixer'),
      require('precss'),
      require('postcss-simple-vars'),
      require('postcss-nested')
    ];
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),

    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.NoErrorsPlugin(),
    new ExtractTextPlugin('[name]-[hash].min.css'),

    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      },
      '__API__BASE__URL__': JSON.stringify('http://139.162.47.241:3008')
    }),

    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })


  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: path.join(__dirname, 'src'),
        loaders: ['babel'],
      },
      {
        test: /\.css$/,
        include: path.join(__dirname, 'src'),
        loaders: [
          'style',
          'css?modules&localIdentName=[name]---[local]---[hash:base64:5]',
          'postcss']
      },
      {
        test: /\.css$/,
        include: path.join(__dirname, 'node_modules'),
        loaders: [
          'style',
          'css',
          'postcss'
        ]
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
          'file?hash=sha512&digest=hex&name=[hash].[ext]',
          'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
        ]
      }
    ]
  },
  resolve: {
    root: path.resolve('./src')
  }
}
