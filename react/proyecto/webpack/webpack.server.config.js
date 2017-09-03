const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const nib = require('nib')

const ExtractCSS = new ExtractTextPlugin('../statics/styles.css');
const ExtractSTYL = new ExtractTextPlugin('../statics/main.css');

module.exports = {
  entry: './source/server.jsx',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, '../built/server'),
  },
  module: {
    rules: [ // cambiamos loaders por rules
      {
        test: /\.jsx?$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        exclude: /(node_modules)/,
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /(node_modules)/,
        query: {
          presets: ['latest-minimal', 'react'],
        },
      },
      {
        test: /\.css$/,
        loader: ExtractCSS.extract({ fallback: 'style-loader', use: 'css-loader?modules' }),
      },
      {
        test: /\.styl$/,
        loader: ExtractSTYL.extract({ fallback: 'style-loader',
          use: ['css-loader?modules', {
            loader: 'stylus-loader',
            options: {
              use: [nib()],
            },
          }],
        }),
      },
    ],
  },
  target: 'node',
  resolve: {
    extensions: ['.js', '.jsx', '.css', '.styl'],
  },
  plugins: [
    // new ExtractTextPlugin('../statics/styles.css'),
    ExtractSTYL,
    ExtractCSS,
  ],
};
