/*
 * @fileOverview: 新增修改页Controller
 * @author: xuzengqiang
 * @date: 2018-06-04 20:35:46
 */
const FileUtils = require('../../utils/FileUtils')
const fs = require('fs')
const rootPath = process.cwd()
const Template = require('../../utils/template/Template')
const log4js = require('koa-log4')
const logger = log4js.getLogger('index')
const lodash = require('lodash')
const symbols = require('log-symbols')
const chalk = require('chalk')
const AddController = require('./AddController')
const ModifyController = require('./ModifyController')
const ConfigController = require('./ConfigController')
const MixinController = require('./MixinController')
const print = require('../../utils/print')

class AddModifyController {
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

    this.addController = new AddController(model, menu)
    this.modifyController = new ModifyController(model, menu)
    this.configController = new ConfigController(model, menu)
    this.mixinController = new MixinController(model, menu)
  }

  /**
   * 构建
   */
  builder () {
    print.out('开始构建新增修改页文件...')
    this.addController.simpleBuilder()
    this.modifyController.simpleBuilder()
    this.configController.builder()
    this.mixinController.builder()
    print.success('新增修改页配置文件构建成功!')
  }

  /**
   * 创建form-fields配置文件
   */
  _createFormFieldsFiles () {
    console.error('构建字段配置文件...')
    const columns = this.model.columns
    let childrens
    columns.forEach(column => {
      childrens = column.childrens
      Array.isArray(childrens) &&
        childrens.forEach(children => {
          this._createSingleFormFieldsFile(children)
        })
    })
  }

  /**
   * 创建验证规则配置文件
   */
  _createRulesFile () {
    console.error('创建rules.js配置文件')
    const file = FileUtils.createFile(`${rootPath}/build/config/rules.js`)
    const template = new Template('configRules')
    template.compile(file)
  }

  /**
   * 创建model文件
   */
  _createModelFile () {
    console.error('创建model.js配置文件')
    const file = FileUtils.createFile(`${rootPath}/build/config/model.js`)
    const template = new Template('configModel')

    const obj = {}
    const emptyKeys = []

    const setObj = subcolumn => {
      if (subcolumn && Array.isArray(subcolumn.fields) && subcolumn.fields.length) {
        let label
        let key
        subcolumn.fields.forEach(field => {
          label = field.label ? (field.label + '').trim() : ''
          key = field.key ? (field.key + '').trim() : ''
          if (label) {
            if (key) {
              lodash.set(obj, key, {
                isleaf: true,
                label
              })
            } else {
              emptyKeys.push({
                label: label,
                key: ''
              })
            }
          }
        })
      }
    }

    let childrens
    this.model.columns.forEach(column => {
      Array.isArray(column.childrens) && column.childrens.forEach(children => setObj(children))
    })

    template.compile(file, {
      emptyKeys,
      nodes: this.createTreeNodeList(obj)
    })
  }

  /**
   * 开始创建add.modify配置文件
   */
  _createAddModifyFile () {
    console.error('构建add.modify.js配置文件...')
    const file = FileUtils.createFile(`${rootPath}/build/mixins/add.modify.js`)
    const template = new Template('mixinsAddModify')
    template.compile(file, {
      hasDialog: this.hasDialog,
      inDialog: this.inDialog,
      router: this.menu.router,
      columns: this.model.columns
    })
  }

  /**
   * 开始创建modify.detail配置文件
   */
  _createModifyDetailFile () {
    console.error('构建modify.detail.js配置文件...')
    const file = FileUtils.createFile(`${rootPath}/build/mixins/modify.detail.js`)
    const template = new Template('mixinsModifyDetail')
    template.compile(file, {
      hasDialog: this.hasDialog,
      inDialog: this.inDialog,
      router: this.menu.router
    })
  }

  /**
   * 创建单个字段配置文件
   */
  _createSingleFormFieldsFile (subcolumn) {
    const fileName = subcolumn && subcolumn.fileName ? (subcolumn.fileName + '').trim() : ''
    if (fileName && subcolumn.fields.length) {
      console.error(`构建字段配置文件${fileName}.js`)
      const file = FileUtils.createFile(`${rootPath}/build/config/${fileName}.js`)
      const template = new Template('configFormFields')
      template.compile(file, {
        subcolumn
      })
    }
  }

  /**
   * 创建树节点
   * @deprecated
   */
  createTreeNodeList (fieldObject) {
    let treeNodeList = []
    let treeNode
    for (let property in fieldObject) {
      treeNode = this.getTreeNode(fieldObject, property)
      if (treeNode) {
        treeNodeList.push(treeNode)
      }
    }
    return treeNodeList
  }

  /**
   * 获取字段树
   * @author xuzengqiang
   * @date 2018-06-05 17:27:00
   * @description
   */
  getTreeNode (fieldObject, property) {
    let node = fieldObject[property]
    if (!node) {
      return null
    }

    let treeNode = {
      key: property,
      childrens: []
    }
    let subTreeNode = null

    if (node.isleaf) {
      treeNode.isleaf = true
      treeNode.label = node.label
    } else if (lodash.isPlainObject(node)) {
      for (let property in node) {
        subTreeNode = this.getTreeNode(node, property)
        if (subTreeNode) {
          treeNode.childrens.push(subTreeNode)
        }
      }
    }

    return treeNode
  }
}

module.exports = AddModifyController
