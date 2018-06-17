/*
 * @fileOverview: 模板引擎
 * @author: xuzengqiang
 * @date: 2018-06-04 10:25:02
 * @description: 单例模式
 */
const FileUtils = require('../FileUtils')
const fs = require('fs')
const moment = require('moment')
const rootPath = process.cwd()
const TEMPLATE_PATH = `${rootPath}/template/`

class TemplateEngine {
  constructor() {
    this.templates = []
  }

  /**
   * 读取模板配置文件
   * @param {String} filepath - 文件路径
   */
  static readFile (filepath) {
    return fs.readFileSync(TEMPLATE_PATH + filepath)
  }

  /**
   * 模板文件缓存
   * @param {String} key - 主键
   * @param {String} filepath - 文件路径
   */
  cacheReadFile (key, filepath) {
    if (this.templates[key]) {
      console.error(`从缓存中读取模板文件:${TEMPLATE_PATH}${filepath}`)
      return this.templates[key]
    }
    try {
      console.error(`读取模版文件:${TEMPLATE_PATH}${filepath}`)
      const file = TemplateEngine.readFile(filepath)
      this.templates[key] = file.toString()
    } catch (e) {
      console.error(`读取模板文件${TEMPLATE_PATH}${filepath}失败:`)
      console.error(e)
      this.templates[key] = null
    }
    return this.templates[key]
  }
}

/**
 * TemplateEngine实例对象
 */
let instance = null

module.exports = {
  /**
   * 获取模板引擎实例对象
   * @return {TemplateEngine.Instance}
   */
  getInstance () {
    if (!instance) {
      instance = new TemplateEngine()
    }
    return instance
  }
}
