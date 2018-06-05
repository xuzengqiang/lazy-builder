/*
 * @fileOverview: 新增修改页Controller
 * @author: xuzengqiang
 * @date: 2018-06-04 20:35:46
 */
const FileUtils = require('../utils/FileUtils')
const fs = require('fs')
const rootPath = process.cwd()
const Template = require('../utils/template/Template')
const log4js = require('koa-log4')
const logger = log4js.getLogger('index')
const lodash = require('lodash')

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
         */
        this.hasDialog = true
    }

    /**
     * 构建
     */
    builder () {
        try {
            this._createIndexFile()
            this._createFormFieldsFiles()
            this._createRulesFile()
            this._createModelFile()
            this._createAddModifyFile()
            this._createModifyDetailFile()
        } catch (e) {
            console.error(e)
        }
    }

    /**
     * 生成入口文件
     */
    _createIndexFile () {
        console.error('构建编辑页入口文件')
        const file = FileUtils.createFile(`${rootPath}/build/add/index.vue`)
        FileUtils.createFile(`${rootPath}/build/add/${this.menu.name}新增.md`)
        const template = new Template('addIndex')
        template.compile(file, {
            hasDialog: this.hasDialog,
            columns: this.model.columns
        })
    }

    /**
     * 创建form-fields配置文件
     */
    _createFormFieldsFiles () {
        console.error('构建字段配置文件...')
        const columns = this.model.columns
        columns.forEach(column => {
            this._createSingleFormFieldsFile(column.leftcontent)
            this._createSingleFormFieldsFile(column.main)
            this._createSingleFormFieldsFile(column.rightcontent)
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

        this.model.columns.forEach(column => {
            setObj(column.leftcontent)
            setObj(column.main)
            setObj(column.rightcontent)
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
