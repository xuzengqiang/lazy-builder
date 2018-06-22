/*
 * @fileOverview: 创建布局文件
 * @author: xuzengqiang
 * @date: 2018-06-17 20:46:13
 * @description 因为稍微复杂一点,所以单独提取出来
 * @since 1.0.2
 * @version 1.0.0
 */
const Template = require('../../utils/template/Template')
const BuilderError = require('../../error/BuilderError')
const print = require('../../utils/print')
const FileUtils = require('../../utils/FileUtils')
const rootPath = process.cwd()

const isNotBlankArray = array => Array.isArray(array) && array.length > 0
class LayoutController {
  /**
   * 构造函数
   * @param { Array } layout - 布局数组
   */
  constructor(layout) {
    this.layout = Array.isArray(layout) ? layout : []
    this.fieldColumns = this.fetchFieldColumns()
  }

  /**
   * 开始构建
   */
  builder () {
    try {
      print.out('开始构建布局文件layout.js')

      const file = FileUtils.createFile(`${rootPath}/build/config/layout.js`)
      const template = new Template('configLayout')
      template.compile(file, {
        fieldColumns: this.fieldColumns,
        layout: this.layout
      })

      print.success('构建layout.js布局文件成功!')
    } catch (e) {
      print.error(e)
      new BuilderError('构建layout.js布局文件失败!')
    }
  }

  /**
   * 根据布局文件提取出所有有fields的栏目
   * @description
   * 1、tab下面不能再挂tab
   */
  fetchFieldColumns () {
    let columns = []
    if (!this.layout.length) {
      return columns
    }

    this.layout.forEach(column => {
      // 如果当前栏目下有子节点
      if (isNotBlankArray(column.childrens)) {
        column.childrens.forEach(children => {
          columns.push(...this._fetchFieldColumnsByColumn(children))

          // 二级节点,本来最好是递归
          if (isNotBlankArray(children.childrens)) {
            children.childrens.forEach(child => {
              columns.push(...this._fetchFieldColumnsByColumn(child))
            })
          }
        })
      }
    })
    return columns
  }

  /**
   * 获取当前栏目下所有有fields的子栏目
   * @param {Object} column - 栏目信息
   */
  _fetchFieldColumnsByColumn (column) {
    let columns = []

    // 如果有fields
    if (isNotBlankArray(column.fields)) {
      columns.push(column)
    }

    // 如果有panes
    if (isNotBlankArray(column.panes)) {
      column.panes.forEach(pane => {
        pane.childrens.forEach(children => {
          if (isNotBlankArray(children.fields)) {
            columns.push(children)
          }
        })
      })
    }

    return columns
  }
}

module.exports = LayoutController
