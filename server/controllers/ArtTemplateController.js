/*
 * @fileOverview: 首页构建controller
 * @author: xuzengqiang
 * @date: 2018-05-31 16:14:41
 */
const FileUtils = require('../utils/FileUtils')
const fs = require('fs')
const rootPath = process.cwd()
const Template = require('../utils/template/Template')
const log4js = require('koa-log4')
const logger = log4js.getLogger('index')
const artTemplate = require('art-template')
const juicer = require('juicer')

class ArtTemplateController {
  /**
   * 构造函数
   */
  constructor(model, menu) { }

  /**
   * 首页配置构建
   */
  builder () {
    console.error('构建首页入口文件')
    const file = FileUtils.createFile(`${rootPath}/build/art-template.vue`)
    const template = new Template('artTemplate')
    juicer.set('strip', false)
    const content = juicer(template.content, {
      hello: '121212'
    })
    console.error(content)
    // const compile = artTemplate.compile(template.content, {
    //   escape: false
    // })
    // const content = compile({
    //   hello: '12122'
    // })
    // const content = artTemplate.render(template.content, {
    //     hello: '12122'
    //   })
    file.write(content)
  }
}

module.exports = ArtTemplateController
