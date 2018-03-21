const Path = require('path');
const Webpack = require('webpack');

module.exports = {

  mode: "development",

  entry: Path.resolve(__dirname, '../src/index.js'),

  output: {
    path: Path.resolve(__dirname, '../public'),
    filename: 'build.js'
  },

  devServer: {
    contentBase: Path.resolve(__dirname, '../public')
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }, 
      {
        test: /\.css$/,
        include: /node_modules/,
        loader: 'style-loader!css-loader',
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          outputPath: 'assets/images/'
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf)$/,
        loader: 'file-loader',
        options: {
          outputPath: 'assets/fonts/'
        }
      }
    ]
  },

  plugins: [
    new Webpack.NamedModulesPlugin(),
    new Webpack.HotModuleReplacementPlugin()
  ]
}