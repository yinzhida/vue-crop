var path = require('path')
var config = require('./config')
var vueLoaderConfig = require('./vue-loader.conf')
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
let nodeExternals = require('webpack-node-externals')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

var webpackConfig = {
  entry: config.jsEntry,
  output: {
    path: config.outputDir,
    filename: `${config.outputJSName}.js`,
    library: config.outputJSName,
    libraryTarget: 'umd'
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
    },
    symlinks: false
  },
  externals: [nodeExternals()],
  devtool: config.cssSourceMap ? '#source-map' : false,
  module: {
    rules: [
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [resolve('js-src'), resolve('test')],
        exclude: [resolve('theme')],
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('index.js'), resolve('node_modules/vue-awesome')]
      },
      {
        test: /\.pcss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'postcss-loader'
        })
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        loader: 'url-loader?limit=100000'
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000
        }
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new ExtractTextPlugin({
      filename: `${config.outputCssName}.css`
    })
  ]
}

if (config.bundleAnalyzerReport) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig
