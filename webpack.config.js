const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const SvgSpriteHtmlWebpackPlugin = require('svg-sprite-html-webpack');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js'
  },
  module: {
    rules: [
      {
        test: /\.(html)$/,
        use: ['html-loader']
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      },
      {
        test: /\.svg$/,
        exclude: /node_modules/,
        use: SvgSpriteHtmlWebpackPlugin.getLoader(),
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: ['file-loader']
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('[name].[sha1:contenthash:base64].css'),
    new HtmlWebpackPlugin({
      template: 'index.html'
    }),
    new SvgSpriteHtmlWebpackPlugin({
      includeFiles: [
        'src/icons/*.svg',
      ]
    }),
    new webpack.HashedModuleIdsPlugin()
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true
  }
};
