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
   * @param {String} [fileName] - 文件名称
   * @description 如果没有文件名称,则会自动生成,有文件名称则会生成到默认路径
   */
  constructor(fields, fileName) {
    this.fields = Array.isArray(fields) ? fields : []

    fileName = typeof fileName === 'string' ? (fileName + '').trim() : ''
    if (fileName) {
      this.fileName = /\.js$/i.test(fileName) ? fileName : `${fileName}.js`
      this.filepath = `${rootPath}/build/config/fields/${fileName}`
    } else {
      fileName = `${uuid()}.js`
      console.error(`自动生成文件名称:${fileName}`)
      this.fileName = fileName
      this.filepath = `${rootPath}/fields/${fileName}`
    }
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
