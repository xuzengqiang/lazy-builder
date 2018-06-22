/*
 * @fileOverview: Handlebars script Helper
 * @author: xuzengqiang
 * @date: 2018-06-03 11:51:09
 * @example
 * {{script 'app.js'}}
 */
const hbs = require('koahub-handlebars')
const rjs = /(\.js)$/

hbs.registerHelper('script', path => {
  path = hbs.Utils.escapeExpression(path)

  // 自动补全.js
  path = rjs.test(path) ? path : `${path}.js`

  const render = `<script type="text/javascript" src="${path}"></script>`
  return new hbs.SafeString(render)
})
