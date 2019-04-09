// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'vue-eslint-parser',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  // https://github.com/standard/standard/blob/master/docs/RULES-en.md
  extends: [
    'standard',
    'plugin:vue/recommended'
  ],
  // add your custom rules here
  'rules': {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    // segment mark
    'semi': [2, 'always'],
    // 不予许多个空行，最多4个
    "no-multiple-empty-lines": [2, { "max": 3 }],
    // 行尾逗号，对象
    "comma-dangle": [0, {
      "objects": "always",
    }],
    // vue html模板检查是否自闭合
    "vue/html-self-closing": "off",
    "vue/max-attributes-per-line": "off"
  }
}
