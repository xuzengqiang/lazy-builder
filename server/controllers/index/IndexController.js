/*
 * @fileOverview: 首页构建controller
 * @author: xuzengqiang
 * @date: 2018-05-31 16:14:41
 */
const FileUtils = require('../../utils/FileUtils')
const Template = require('../../utils/template/Template')
const print = require('../../utils/print')
const BuildError = require('../../error/BuilderError')
const fs = require('fs')
const rootPath = process.cwd()
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
      print.out('开始构建首页相关配置文件...')
      this._createIndexFile()
      this._createDataFile()
      this._createMethodFile()
      this._createHooksFile()
      this._createComponentsFile()
      this._createMixinFile()
      this._createQueryTableFile()
      print.success('首页相关配置文件构建成功!')
    } catch (e) {
      new BuilderError(e)
    }
  }

  /**
   * 首页单文件构建
   * @since  1.0.1
   */
  unifileBuilder () {
    print.out('构建首页单文件')
    const file = FileUtils.createFile(`${rootPath}/build/index.vue`)
    const template = new Template('indexUnifile')
    const option = this.model.option
    template.compile(file, {
      hasDialog: this.hasDialog,
      hasSelection: this.hasSelection,
      hasComponents: this.hasComponents,
      hasOperation: this.hasOperation,
      menu: this.menu.router,
      searchCode: option.searchCode,
      customSearchCode: option.customSearchCode,
      customColumnCode: option.customColumnCode,
      method: option.method,
      formTools: this.model.formToolList,
      tools: this.model.toolList
    })
    print.success('首页单文件构建成功!')
  }

  /**
   * 创建首页入口文件
   */
  _createIndexFile () {
    print.out('构建首页入口文件')
    const file = FileUtils.createFile(`${rootPath}/build/index/index.vue`)
    FileUtils.createFile(`${rootPath}/build/index/${this.menu.name}首页.md`)
    const template = new Template('index')
    template.compile(file, {
      hasDialog: this.hasDialog
    })
    print.success('首页入口文件构建成功!')
  }

  /**
   * 创建首页data文件
   */
  _createDataFile () {
    print.out('构建首页data.js')
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
    print.out('构建首页methods.js')
    const file = FileUtils.createFile(`${rootPath}/build/index/mixins/methods.js`)
    const template = new Template('indexMethods')
    template.compile(file, {
      hasDialog: this.hasDialog
    })
  }

  /**
   * 创建首页hooks文件
   * @description 修改beforeRouteEnter为hooks,因为文件命名不允许有驼峰式
   */
  _createHooksFile () {
    print.out('构建首页hooks.js')
    const file = FileUtils.createFile(`${rootPath}/build/index/mixins/hooks.js`)
    const template = new Template('indexHooks')
    template.compile(file)
  }

  /**
   * 创建components文件
   */
  _createComponentsFile () {
    if (!this.hasComponents) return
    print.out('构建首页components.js')
    const file = FileUtils.createFile(`${rootPath}/build/index/mixins/components.js`)
    const template = new Template('indexComponents')
    template.compile(file, {})
  }

  /**
   * 创建混合入口文件
   */
  _createMixinFile () {
    print.out('构建首页mixins.js')
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
    print.out('构建首页custom-filter.js文件')
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
    print.out('构建首页query-table.js文件')
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
      hasSelection: this.hasSelection,
      menu: this.menu.router,
      searchCode: option.searchCode
    })
  }
}

module.exports = IndexController
