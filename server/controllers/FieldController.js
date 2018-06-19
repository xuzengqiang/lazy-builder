/*
 * @fileOverview: 字段文件生成
 * @author: xuzengqiang
 * @date: 2018-06-17 19:38:46
 * @since 1.0.2
 * @description 根据fields数组生成指定的配置文件
 */
const fs = require('fs')
const rootPath = process.cwd()
const moment = require('moment')
const FileUtils = require('../utils/FileUtils')
const BuilderError = require('../error/BuilderError')
const print = require('../utils/print')
const Template = require('../utils/template/Template')

const uuid = () => moment(new Date()).format('YYYYMMDDHHmmss')

class FieldController {

  /**
   * 构造函数
   * @param {Array} fields - 字段配置信息
   */
  constructor(fields, fileName, filepath) {
    this.fields = Array.isArray(fields) ? fields : []
    this.fileName = `${uuid()}`
    this.filepath = `${rootPath}/fields/${this.fileName}.js`
  }

  /**
   * 构建字段文件
   */
  builder () {
    if (this.fields.length) {
      print.out(`构建字段配置文件${this.fileName}.js`)
      const file = FileUtils.createFile(this.filepath)
      const template = new Template('configFormFields')
      template.compile(file, {
        fields: this.fields
      })
    }
  }
}

module.exports = FieldController
