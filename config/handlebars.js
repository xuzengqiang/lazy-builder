/**
 * @copyright (c) 2018, www.wicoder.net. All rights reserved.
 * @fileOverview 模板引擎配置文件
 * @author xuzengqiang <253948113@qq.com>
 * @date 2018-05-30 12:00:47
 * @version 1.0.0
 * 
 * @update xuzengqiang
 * @date 2018-06-03 11:08:50
 * @version 1.0.1
 * @description 采用koahub-handlebars中间件
 */
const hbs = require('koahub-handlebars')
const rootPath = process.cwd()
// const Handlebars = require('handlebars')
// const HandlebarsDelimiters = require('handlebars-delimiters')

// HandlebarsDelimiters(Handlebars, ['${', '}'])
const HandlebarsViews = () => hbs.middleware({
    viewPath: `${rootPath}/views`,
    partialsPath: `${rootPath}/views/components`
})

module.exports = HandlebarsViews