/*
 * @fileOverview: Handlebars stylesheet Helper
 * @author: xuzengqiang
 * @date: 2018-06-03 11:31:41
 * @example
 * {{link 'styles.css'}}
 */
const hbs = require('koahub-handlebars')
hbs.registerHelper('stylesheet', path => {
    path = hbs.Utils.escapeExpression(path)
    const render = `<link type="text/css" rel="stylesheet" href="${path}">`
    return new hbs.SafeString(render)
})
