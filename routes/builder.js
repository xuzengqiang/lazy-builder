/*
 * @fileOverview: 项目构建JS
 * @author: xuzengqiang
 * @date: 2018-05-31 12:04:15
 */
const router = require('koa-router')()
const fs = require('fs')
const BuilderController = require('../server/controllers/BuilderController')
const IndexController = require('../server/controllers/index/IndexController')
const AddController = require('../server/controllers/addModify/AddController')
const ArtTemplateController = require('../server/controllers/artTemplate/ArtTemplateController')
const print = require('../server/utils/print')

/**
 * 代码构建
 * @param {Objec} ctx
 * @param {Function} runner - 代码构建
 */
const codeBuilder = (ctx, runner) => {
  try {
    const startTime = new Date().getTime()
    print.out('开始构建...')
    runner()
    const endTime = new Date().getTime()
    print.success(`代码构建成功!耗时:${endTime - startTime}ms!`)
    ctx.body = {
      status: 'SUCCESS',
      message: '代码构建成功!'
    }
  } catch (e) {
    print.error('代码构建失败!')
    print.error(e)
    ctx.body = {
      status: 'ERROR',
      error: e,
      message: '代码构建失败!'
    }
  }
}

/**
 * 完整构建项目文件夹
 * @description 通过ctx.request.body可以获取到请求的参数信息
 */
router.post('/complete-builder', function (ctx, next) {
  codeBuilder(ctx, () => {
    const builderController = new BuilderController(ctx.request.body)
    builderController.completeBuilder()
  })
})

/**
 * 构建首页
 */
router.post('/index-builder', function (ctx, next) {
  codeBuilder(ctx, () => {
    const builderController = new BuilderController(ctx.request.body)
    builderController.indexBuilder()
  })
})

/**
 * 首页单文件构建
 */
router.post('/index-unifile-builder', function (ctx, next) {
  codeBuilder(ctx, () => {
    const options = ctx.request.body
    const menu = options.menu
    const indexModel = options.indexModel
    const indexController = new IndexController(indexModel, menu)
    indexController.unifileBuilder()
  })
})

/**
 * artTemplate模板测试
 */
router.post('/art-template', (ctx, next) => {
  codeBuilder(ctx, () => {
    const artTemplateController = new ArtTemplateController()
    artTemplateController.builder()
  })
})

/**
 * 新增页单独构建
 */
router.post('/add-builder', (ctx, next) => {
  codeBuilder(ctx, () => {
    const options = ctx.request.body
    const addController = new AddController(options.addModifyModel, options.menu)
    addController.builder()
  })
})

module.exports = router
