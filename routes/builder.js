/*
 * @fileOverview: 项目构建JS
 * @author: xuzengqiang
 * @date: 2018-05-31 12:04:15
 */
const router = require('koa-router')()
const fs = require('fs')
const BuilderController = require('../server/controllers/BuilderController')
const IndexController = require('../server/controllers/IndexController')
const ArtTemplateController = require('../server/controllers/ArtTemplateController')

/**
 * 完整构建项目文件夹
 * @description 通过ctx.request.body可以获取到请求的参数信息
 */
router.post('/complete-builder', function(ctx, next) {
  const builderController = new BuilderController(ctx.request.body)
  builderController.completeBuilder()
  ctx.body = 'builder'
})

/**
 * 构建首页
 */
router.post('/index-builder', function(ctx, next) {
  const builderController = new BuilderController(ctx.request.body)
  builderController.indexBuilder()
  ctx.body = 'builder'
})

/**
 * 首页单文件构建
 */
router.post('/index-unifile-builder', function(ctx, next) {
  const options = ctx.request.body
  const menu = options.menu
  const indexModel = options.indexModel
  const indexController = new IndexController(indexModel, menu)
  indexController.unifileBuilder()
  ctx.body = 'builder'
})

/**
 * artTemplate模板测试
 */
router.post('/art-template', (ctx, next) => {
  const artTemplateController = new ArtTemplateController()
  artTemplateController.builder()
  ctx.body = 'art-template'
})

module.exports = router
