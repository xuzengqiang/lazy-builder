/*
 * @fileOverview: 新增页单独controller
 * @author: xuzengqiang
 * @date: 2018-06-17 21:33:49
 */
const BuilderError = require('../../error/BuilderError')
const print = require('../../utils/print')
const Template = require('../../utils/template/Template')
const FileUtils = require('../../utils/FileUtils')
const LayoutController = require('../layout/LayoutController')
const rootPath = process.cwd()
class AddController {
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
    this.layoutController = new LayoutController(model.columns, `${rootPath}/build/add-module-code/config/layout.js`)
    this.layoutController.setTemplatePath('addLayoutConfig')
  }

  /**
   * 新增页单独构建
   * @description
   * 1、生成layout.js布局文件
   * 2、生成model.js文件
   * 3、生成rules.js文件
   * 4、生成index.vue
   * 5、生成混合文件
   */
  builder () {
    try {
      print.out('开始构建新增页代码')
      this._createIndexFile()
      this._createRulesFile()
      this._createModelFile()
      this._createLayoutFile()
      this._createMixinFile()
      this._createFormFieldsFiles()
      print.success('新增页构建成功!')
    } catch (e) {
      print.error(e)
      new BuilderError('新增页构建失败!')
    }
  }

  /**
   * 新增页简单构建
   * @description
   * 只会生成index.vue,其他的公用config
   */
  simpleBuilder () {
    try {
      print.out('构建新增页入口文件...')
      const file = FileUtils.createFile(`${rootPath}/build/add/index.vue`)
      FileUtils.createFile(`${rootPath}/build/add/${this.menu.name}新增.md`)
      const template = new Template('addIndex')
      template.compile(file, {
        hasDialog: this.hasDialog,
        inDialog: this.inDialog
      })
      print.success('新增页入口文件构建成功!')
    } catch (e) {
      print.error(e)
      new BuilderError('新增页入口文件构建失败!')
    }
  }

  /**
   * 创建详情入口文件
   */
  _createIndexFile () {
    print.out('构建新增页入口文件')
    const file = FileUtils.createFile(`${rootPath}/build/add-module-code/index.vue`)
    FileUtils.createFile(`${rootPath}/build/add-module-code/${this.menu.name}新增.md`)
    const template = new Template('addUnfileIndex')
    template.compile(file, {
      hasDialog: this.hasDialog,
      inDialog: this.inDialog
    })
  }

  /**
   * 创建验证规则文件
   */
  _createRulesFile () {
    print.out('创建rules.js配置文件')
    const file = FileUtils.createFile(`${rootPath}/build/add-module-code/config/rules.js`)
    const template = new Template('addRulesConfig')
    template.compile(file)
  }

  /**
   * 创建model配置文件
   */
  _createModelFile () {
    print.out('创建model.js配置文件')
    const file = FileUtils.createFile(`${rootPath}/build/add-module-code/config/model.js`)
    const template = new Template('addModelConfig')
    template.compile(file)
  }

  /**
   * 创建新增页混合入口文件
   */
  _createMixinFile () {
    print.out('构建新增页mixins.js')
    const file = FileUtils.createFile(`${rootPath}/build/add-module-code/mixins/index.js`)
    const template = new Template('addMixinsIndex')
    template.compile(file, {
      hasDialog: this.hasDialog,
      inDialog: this.inDialog,
      router: this.menu.router
    })
  }

  /**
   * 创建布局文件
   */
  _createLayoutFile () {
    this.layoutController.builder()
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
        print.out(`构建新增字段配置文件${fileName}.js`)
        file = FileUtils.createFile(`${rootPath}/build/add-module-code/config/fields/${fileName}.js`)
        template = new Template('configFormFields')
        template.compile(file, {
          fields: column.fields
        })
      }
    })
  }
}

module.exports = AddController
