// https://github.com/michael-ciniawsky/postcss-load-config
var path = require('path');

module.exports = {
    "plugins": {
        "postcss-import": {
            path: ["src/css"]
        },
        "postcss-url": {},
        'postcss-cssnext': {}
    }
}
