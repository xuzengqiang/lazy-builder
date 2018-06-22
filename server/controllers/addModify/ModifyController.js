/*
 * @fileOverview: 修改页controller
 * @author: xuzengqiang
 * @date: 2018-06-17 21:55:09
 */
const Template = require('../../utils/template/Template')
const BuilderError = require('../../error/BuilderError')
const print = require('../../utils/print')
const FileUtils = require('../../utils/FileUtils')
const rootPath = process.cwd()
class ModifyController {
  /**
   * 构造函数
   * @param {Object} model - 请求的参数信息
   * @param {Object} menu - 菜单配置
   */
  constructor(model, menu) {
    this.model = model
    this.menu = menu

    /**
     * 是否有弹出窗
     * @type {Boolean}
     */
    this.hasDialog = model.option.hasDialog

    /**
     * 是否在弹窗内部
     * @type {Boolean}
     */
    this.inDialog = model.option.inDialog
  }

  /**
   * 修改页单独构建
   * @description
   * 1、生成layout.js布局文件
   * 2、生成index.vue
   */
  builder () {

  }

  /**
   * 修改页简单构建
   * @description
   * 只会生成index.vue,其他的公用config
   */
  simpleBuilder () {
    try {
      print.out('构建修改页入口文件...')
      const file = FileUtils.createFile(`${rootPath}/build/modify/index.vue`)
      FileUtils.createFile(`${rootPath}/build/add/${this.menu.name}修改.md`)
      const template = new Template('modifyIndex')
      template.compile(file, {
        hasDialog: this.hasDialog,
        inDialog: this.inDialog
      })
      print.success('修改页入口文件构建成功!')
    } catch (e) {
      print.error(e)
      new BuilderError('修改页入口文件构建失败!')
    }
  }

  /**
   * 修改页单文件构建
   * @description
   */
  singleBuilder () {

  }
}

module.exports = ModifyController
