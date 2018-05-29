/**
 * @fileOverview 项目入口文件
 * @author xuzengqiang <253948113@qq.com>
 * @date 2018-5-29 00:47:26
 * @version 1.0.0
 */

const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const Handlebars = require('./config/handlebars')

const index = require('./routes/index')
const users = require('./routes/users')

console.error(Handlebars)

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
app.use(require('koa-static')(__dirname + '/public'))

/**
 * 配置模板引擎中间件,使用handlebars模板引擎
 * @date 2018-5-29 23:47:42
 * @description npm install --save-dev handlebars
 */
app.use(views(__dirname + '/views', Handlebars))

// logger
app.use(async (ctx, next) => {
    const start = new Date()
    await next()
    const ms = new Date() - start
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

/**
 * 使用路由中间件
 */
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx)
})

module.exports = app
