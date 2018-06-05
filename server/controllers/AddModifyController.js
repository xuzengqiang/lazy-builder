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
            this._createAddModifyFile()
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
        console.error('创建验证规则配置文件')
        const file = FileUtils.createFile(`${rootPath}/build/config/rules.js`)
        const template = new Template('configRules')
        template.compile(file)
    }

    /**
     * 开始创建add.modify配置文件
     */
    _createAddModifyFile () {
        console.error('构建新增修改配置文件...')
        const file = FileUtils.createFile(`${rootPath}/build/mixins/add.modify.js`)
        const template = new Template('mixinsAddModify')
        template.compile(file, {
            hasDialog: this.hasDialog,
            router: this.menu.router,
            columns: this.model.columns
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
}

module.exports = AddModifyController
