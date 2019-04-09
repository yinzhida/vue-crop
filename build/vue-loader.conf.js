var utils = require('./utils')
var config = require('./config')

// function resolve (dir) {
//   return path.join(__dirname, '..', 'src', dir)
// }

module.exports = {
  loaders: utils.cssLoaders({
    sourceMap: config.cssSourceMap,
    extract: config.extract
  }),
  transformToRequire: {
    video: 'src',
    source: 'src',
    img: 'src',
    image: 'xlink:href'
  }
}
