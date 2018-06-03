/*
 * @fileOverview: 项目构建JS
 * @author: xuzengqiang
 * @date: 2018-05-31 12:04:15
 */
const router = require('koa-router')()
const fs = require('fs')
const BuilderController = require('../server/controllers/BuilderController')

/**
 * 构建项目文件夹
 * @description 通过ctx.request.body可以获取到请求的参数信息
 */
router.post('/builder', function(ctx, next) {
    const builderController = new BuilderController(ctx.request.body)
    builderController.build()
    ctx.body = 'builder'
})

module.exports = router
