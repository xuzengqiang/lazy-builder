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

class IndexController {
  /**
   * 构造函数
   * @param {Object} model - 请求的参数信息
   * @param {Object} menu - 菜单配置
   */
  constructor(model, menu) {
    this.model = model
    this.menu = menu

    /**
     * 是否生成复选框
     * @type {Boolean}
     */
    this.hasSelection = model.option.hasSelection

    /**
     * 是否有编辑操作
     * @type {Boolean}
     */
    this.hasOperation = model.option.hasEdit

    /**
     * 是否有弹出层
     * @type {Boolean}
     */
    this.hasDialog = model.option.hasDialog

    /**
     * 是否生成components.js文件
     * @type {Boolean}
     */
    this.hasComponents = this.hasDialog
  }

  /**
   * 首页配置构建
   */
  builder () {
    try {
      this._createIndexFile()
      this._createDataFile()
      this._createMethodFile()
      this._createBeforeRouteEnterFile()
      this._createComponentsFile()
      this._createMixinFile()
      this._createCustomFilterFile()
      this._createQueryTableFile()
    } catch (e) {
      console.error(e)
    }
  }

  /**
   * 创建首页入口文件
   */
  _createIndexFile () {
    console.error('构建首页入口文件')
    const file = FileUtils.createFile(`${rootPath}/build/index/index.vue`)
    FileUtils.createFile(`${rootPath}/build/index/${this.menu.name}首页.md`)
    const template = new Template('index')
    template.compile(file, {
      hasDialog: this.hasDialog
    })
  }

  /**
   * 创建首页data文件
   */
  _createDataFile () {
    console.error('构建首页data.js')
    const file = FileUtils.createFile(`${rootPath}/build/index/mixins/data.js`)
    const template = new Template('indexData')
    template.compile(file, {
      hasDialog: this.hasDialog,
      hasSelection: this.hasSelection
    })
  }

  /**
   * 创建首页method文件
   * @param {Boolean}
   */
  _createMethodFile () {
    console.error('构建首页methods.js')
    const file = FileUtils.createFile(`${rootPath}/build/index/mixins/methods.js`)
    const template = new Template('indexMethods')
    template.compile(file, {
      hasDialog: this.hasDialog
    })
  }

  /**
   * 创建首页beforeRouteEnter文件
   */
  _createBeforeRouteEnterFile () {
    console.error('构建首页beforeRouteEnter.js')
    const file = FileUtils.createFile(`${rootPath}/build/index/mixins/beforeRouteEnter.js`)
    const template = new Template('indexBeforeRouteEnter')
    template.compile(file)
  }

  /**
   * 创建components文件
   */
  _createComponentsFile () {
    if (!this.componentsFlag) return
    console.error('构建首页components.js')
    const file = FileUtils.createFile(`${rootPath}/build/index/mixins/components.js`)
    const template = new Template('indexComponents')
    template.compile(file, {})
  }

  /**
   * 创建混合入口文件
   */
  _createMixinFile () {
    console.error('构建首页mixins.js')
    const file = FileUtils.createFile(`${rootPath}/build/index/mixins/index.js`)
    const template = new Template('indexMixin')
    template.compile(file, {
      hasComponents: this.hasComponents
    })
  }

  /**
   * 创建CustomFilter文件
   */
  _createCustomFilterFile () {
    console.error('构建首页custom-filter.js文件')
    const file = FileUtils.createFile(`${rootPath}/build/index/config/custom-filter.js`)
    const option = this.model.option
    const template = new Template('indexCustomFilter')
    template.compile(file, {
      menu: this.menu.router,
      method: option.method,
      searchCode: option.searchCode
    })
  }

  /**
   * 生成query-table
   */
  _createQueryTableFile () {
    console.error('构建首页query-table.js文件')
    const file = FileUtils.createFile(`${rootPath}/build/index/config/query-table.js`)
    const option = this.model.option
    const template = new Template('indexQueryTable')
    template.compile(file, {
      hasOperation: this.hasOperation,
      customSearchCode: option.customSearchCode,
      customColumnCode: option.customColumnCode,
      method: option.method,
      formTools: this.model.formToolList,
      tools: this.model.toolList,
      hasSelection: this.hasSelection
    })
  }
}

module.exports = IndexController
