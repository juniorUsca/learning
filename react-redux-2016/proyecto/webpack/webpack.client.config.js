const webpack = require('webpack')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const nib = require('nib')

const ExtractCSS = new ExtractTextPlugin('../statics/styles.css');
const ExtractSTYL = new ExtractTextPlugin('../statics/main.css');

const config = {
  entry: './source/client.jsx',
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, '../built/statics'),
    publicPath: process.env.NODE_ENV === 'production'
      ? 'https://junior-react-statics.now.sh'
      : 'http://localhost:3001/', // sirve para importar cosas asincronas
  },
  module: {
    rules: [ // change loaders by rules
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
          presets: ['es2016', 'es2017', 'react'],
          plugins: ['transform-es2015-modules-commonjs'],
          env: {
            production: {
              plugins: ['transform-regenerator', 'transform-runtime'],
              presets: ['es2015'], // generamos todo es2015 para navegadores antiguos
            },
            development: {
              plugins: ['transform-es2015-modules-commonjs'],
            },
          },
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
  target: 'web',
  resolve: {
    extensions: ['.js', '.jsx', '.css', '.styl', '.json'],
  },
  plugins: [
    new webpack.DefinePlugin({ // es para que react optimize el bundle para produccion
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
      },
    }),
    // new ExtractTextPlugin('../statics/styles.css'),
    ExtractSTYL,
    ExtractCSS,
  ],
};

if (process.env.NODE_ENV === 'production') {
  config.plugins.push(
    new UglifyJSPlugin({
      compress: {
        warnings: false,
      },
      mangle: {
        except: ['$super', '$', 'exports', 'require'], // que es lo q no debe minificar
      },
    }) // uglify
  )
}

module.exports = config
