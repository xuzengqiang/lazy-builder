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

const index = require('./routes/index')
const users = require('./routes/users')

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
app.use(require('koa-static')(__dirname + '/public'))

/**
 * 使用handlebars模板引擎
 * @date 2018-5-29 23:47:42
 * @description npm install --save-dev handlebars
 */
app.use(
    views(__dirname + '/views', {
        map: {
            hbs: 'handlebars'
        },
        extension: 'hbs'
    })
)

// logger
app.use(async (ctx, next) => {
    const start = new Date()
    await next()
    const ms = new Date() - start
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx)
})

module.exports = app
