module.exports = {
  plugins: {
    autoprefixer: {},
    "postcss-px-to-viewport": {
      viewportWidth: 375,
      viewportHeight: 667,
      unitPrecision: 5,
      viewportUnit: 'vw',
      selectorBlackList: ['ignore','tab-bar'],
      minPixelValue: 1,
      mediaQuery: false,
      exclude: [/TabBar/]  //正则匹配文件
    },
  }
}

// 1. 在js中使用正则： /正则相关规则/
// 2. exclude中存放的元素必须是正则表达式
// 3. 按照排除的文件写对应的正则：
// 正则的规则：
// 1》 ^abc:表示匹配的内容，必须以什么内容开头（以abc开头）
// 2》 abc$:表示匹配的内容，必须以什么内容结尾（以abc结尾）
