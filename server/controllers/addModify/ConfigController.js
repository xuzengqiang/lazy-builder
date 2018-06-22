/*
 * @fileOverview: config文件夹生成
 * @author: xuzengqiang
 * @date: 2018-06-17 19:37:04
 * @since 1.0.2
 * @version 1.0.0
 */
const BuilderError = require('../../error/BuilderError')
const LayoutController = require('../layout/LayoutController')
const print = require('../../utils/print')
const FileUtils = require('../../utils/FileUtils')
const rootPath = process.cwd()
const Template = require('../../utils/template/Template')

class ConfigController {
  /**
   * 构造函数
   * @param {Object} model - 请求的参数信息
   * @param {Object} menu - 菜单配置
   */
  constructor(model, menu) {
    this.model = model
    this.menu = menu
    this.layoutController = new LayoutController(model.columns)
  }

  /**
   * 开始构建
   * @description
   * 1、生成model.js
   * 2、生成layout.js
   * 3、生成rules.js
   * 4、生成字段配置文件
   */
  builder () {
    try {
      print.out('开始构建config配置文件...')
      this._createModelFile()
      this._createRulesFile()
      this._createLayoutFile()
      this._createFieldFiles()
      print.success('config配置文件构建成功!')
    } catch (e) {
      print.error(e)
      new BuilderError('config配置文件构建失败!')
    }
  }

  /**
   * 创建model配置文件
   */
  _createModelFile () {
    print.out('创建model.js配置文件')
    const file = FileUtils.createFile(`${rootPath}/build/config/model.js`)
    const template = new Template('configModel')
    template.compile(file)
  }

  /**
   * 创建验证规则文件
   */
  _createRulesFile () {
    print.out('创建rules.js配置文件')
    const file = FileUtils.createFile(`${rootPath}/build/config/rules.js`)
    const template = new Template('configRules')
    template.compile(file)
  }

  /**
   * 创建字段配置文件
   */
  _createFieldFiles () {
    const columns = this.layoutController.fieldColumns
    let fileName
    let file
    let template

    columns.forEach(column => {
      fileName = column.fileName ? (column.fileName + '').trim() : ''
      if (fileName) {
        print.out(`构建新增修改字段配置文件${fileName}.js`)
        file = FileUtils.createFile(`${rootPath}/build/config/fields/${fileName}.js`)
        template = new Template('configFormFields')
        template.compile(file, {
          fields: column.fields
        })
      }
    })
  }

  /**
   * 创建布局文件
   */
  _createLayoutFile () {
    this.layoutController.builder()
  }

}

module.exports = ConfigController
