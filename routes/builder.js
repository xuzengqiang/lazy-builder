/*
 * @fileOverview: 项目构建JS
 * @author: xuzengqiang
 * @date: 2018-05-31 12:04:15
 */
const router = require('koa-router')()

/**
 * 构建项目文件夹
 */
router.post('/builder', function (ctx, next) {



    ctx.body = 'builder'
})

module.exports = router