/*
 * @fileOverview: 详情页构建
 * @author: xuzengqiang
 * @date: 2018-05-31 16:16:43
 */
const FileUtils = require('../../utils/FileUtils')
const fs = require('fs')
const rootPath = process.cwd()
const Template = require('../../utils/template/Template')
const log4js = require('koa-log4')
const logger = log4js.getLogger('index')
const lodash = require('lodash')
const BuilderError = require('../../error/BuilderError')
const print = require('../../utils/print')
const LayoutController = require('../layout/LayoutController')
const FieldController = require('../FieldController')

class DetailController {
  /**
   * 构造函数
   */
  constructor(model, addModifyModel, menu) {
    this.model = model
    this.addModifyModel = addModifyModel
    this.menu = menu

    /**
     * 是否有弹窗
     */
    this.hasDialog = true
    this.layoutController = new LayoutController(addModifyModel.columns)
  }

  /**
   * 详情页配置构建
   */
  builder () {
    try {
      print.out('开始构建详情页代码....')
      this._createIndexFile()
      this._createDataFile()
      this._createMethodFile()
      this._createComponentsFile()
      this._createMixinFile()
      this._createSearchPagerFile()
      this._createFormFieldsFiles()
      print.success('详情页代码构建成功!')
    } catch (e) {
      console.error(e)
      new BuilderError('详情页代码构建失败!')
    }
  }

  /**
   * 创建详情入口文件
   */
  _createIndexFile () {
    print.out('构建详情页入口文件')
    const file = FileUtils.createFile(`${rootPath}/build/detail/index.vue`)
    FileUtils.createFile(`${rootPath}/build/detail/${this.menu.name}详情.md`)
    const template = new Template('detailIndex')
    template.compile(file, {
      hasDialog: this.hasDialog,
      columns: this.addModifyModel.columns
    })
  }

  /**
   * 创建详情页data文件
   */
  _createDataFile () {
    print.out('构建详情页data.js')
    const file = FileUtils.createFile(`${rootPath}/build/detail/mixins/data.js`)
    const template = new Template('detailMixinsData')
    template.compile(file, {
      hasDialog: this.hasDialog,
      columns: this.addModifyModel.columns
    })
  }

  /**
   * 创建详情页methods文件
   * @param {Boolean}
   */
  _createMethodFile () {
    print.out('构建详情页methods.js')
    const file = FileUtils.createFile(`${rootPath}/build/detail/mixins/methods.js`)
    const template = new Template('detailMixinsMethods')
    template.compile(file, {
      hasDialog: this.hasDialog
    })
  }

  /**
   * 创建详情页components文件
   */
  _createComponentsFile () {
    print.out('构建详情页components.js')
    const file = FileUtils.createFile(`${rootPath}/build/detail/mixins/components.js`)
    const template = new Template('detailMixinsComponents')
    template.compile(file)
  }

  /**
   * 创建详情页混合入口文件
   */
  _createMixinFile () {
    print.out('构建详情页mixins.js')
    const file = FileUtils.createFile(`${rootPath}/build/detail/mixins/index.js`)
    const template = new Template('detailMixinsIndex')
    template.compile(file)
  }

  /**
   * 创建SearchPager文件
   */
  _createSearchPagerFile () {
    print.out('构建详情页search-pager.js文件')
    const file = FileUtils.createFile(`${rootPath}/build/detail/config/search-pager.js`)
    const template = new Template('detailConfigSearchPager')
    template.compile(file, {
      router: this.menu.router
    })
  }

  /**
   * 生成form-fields文件
   */
  _createFormFieldsFiles () {
    const columns = this.layoutController.fieldColumns
    let fileName
    let file
    let template

    columns.forEach(column => {
      fileName = column.fileName ? (column.fileName + '').trim() : ''
      if (fileName) {
        print.out(`构建详情页字段配置文件${fileName}.js`)
        file = FileUtils.createFile(`${rootPath}/build/detail/config/fields/${fileName}.js`)
        template = new Template('detailConfigFormFields')
        template.compile(file, {
          fields: column.fields
        })
      }
    })
  }
}

module.exports = DetailController
