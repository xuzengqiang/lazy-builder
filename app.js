/**
 * @fileOverview 项目入口文件
 * @author xuzengqiang <253948113@qq.com>
 * @date 2018-5-29 00:47:26
 * @version 1.0.0
 *
 * @update xuzengqiang
 * @date 2018-6-3 21:45:52
 * @version 1.0.1
 * @description 引入log4j(npm install --save koa-log4)
 */

const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const HandlebarsViews = require('./config/handlebars')
const log4js = require('koa-log4')

const index = require('./routes/index')
const users = require('./routes/users')
const builder = require('./routes/builder')

// error handler
onerror(app)

// middlewares
app.use(
    bodyparser({
        enableTypes: ['json', 'form', 'text']
    })
)

app.use(json())
app.use(logger())

/**
 * 静态资源中间件
 * @description
 * 1、表示放在项目根目录下的public文件夹下,引用的时候相对这个目录即可.
 */
app.use(require('koa-static')(__dirname + '/src'))

/**
 * 配置模板引擎中间件,使用handlebars模板引擎
 * @date 2018-5-29 23:47:42
 * @description npm install --save-dev handlebars
 */
app.use(HandlebarsViews())

// logger
app.use(async (ctx, next) => {
    const start = new Date()
    await next()
    const ms = new Date() - start
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

/**
 * 使用log4j中间件
 * @since 1.0.1
 */
app.use(
    log4js.koaLogger(log4js.getLogger('http'), {
        level: 'auto'
    })
)

/**
 * 使用路由中间件
 */
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
app.use(builder.routes(), builder.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx)
})

module.exports = app
