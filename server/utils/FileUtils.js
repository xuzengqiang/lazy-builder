/*
 * @fileOverview: node.js 文件操作
 * @author: xuzengqiang
 * @date: 2018-05-31 15:49:38
 */
const fs = require('fs')
const path = require('path')
class FileUtils {

  /**
   * 创建文件夹.
   * @param {String} dirpath - 文件路径
   * @description 如果父目录不存在则创建
   * @fixed 在windows下文件夹分割BUG
   */
  static createFolder (dirpath) {
    if (!dirpath) return
    const sep = path.sep
    const folders = path.dirname(dirpath).split('/')
    let p = ''
    while (folders.length) {
      p += folders.shift() + sep
      if (!fs.existsSync(p)) {
        fs.mkdirSync(p)
      }
    }
  }

  /**
   * 创建文件
   * @param {String} filepath - 文件路径
   * @param {String} encoding - 编码
   */
  static createFile (filepath, encoding = 'utf8') {
    if (!filepath) return null

    try {
      FileUtils.createFolder(filepath)
      return fs.createWriteStream(filepath, encoding)
    } catch (e) {
      console.error(e)
      return null
    }
  }
}

module.exports = FileUtils
