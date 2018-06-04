/*
 * @fileOverview: 新增修改页Controller
 * @author: xuzengqiang
 * @date: 2018-06-04 20:35:46
 */
const FileUtils = require('../utils/FileUtils')
const fs = require('fs')
const rootPath = process.cwd()
const Template = require('../utils/template/Template')
const log4js = require('koa-log4')
const logger = log4js.getLogger('index')

class AddModifyController {
  /**
   * 构造函数
   * @param {Object} model - 请求的参数信息
   * @param {Object} menu - 菜单配置
   */
  constructor(model, menu) {
    this.model = model
    this.menu = menu
  }

  /**
   * 构建
   */
  builder() {
    try {
      this._createIndexFile()
    } catch (e) {
      console.error(e)
    }
  }

  /**
   * 生成入口文件
   */
  _createIndexFile() {
    console.error('构建编辑页入口文件')
    const file = FileUtils.createFile(`${rootPath}/build/add/index.vue`)
    const template = new Template('addIndex')
    template.compile(file, {
      hasDialog: false,
      columns: this.model.columns
    })
  }
}

module.exports = AddModifyController
