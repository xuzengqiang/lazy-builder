/*
 * @fileOverview: 首页构建controller
 * @author: xuzengqiang
 * @date: 2018-05-31 16:14:41
 */
const FileUtils = require('../utils/FileUtils')
const fs = require('fs')
const rootPath = process.cwd()
const Template = require('../utils/template/Template')
const log4js = require('koa-log4')
const logger = log4js.getLogger('index')
const BuilderUtils = require('../utils/BuilderUtils')

class IndexController {
    /**
     * 构造函数
     * @param {Object} model - 请求的参数信息
     * @param {Object} menu - 菜单配置
     */
    constructor(model, menu) {
        this.model = model
        this.menu = menu

        /**
         * 是否生成复选框
         * @type {Boolean}
         */
        this.selectionFlag = model.option.hasSelection

        /**
         * 是否有编辑操作
         * @type {Boolean}
         */
        this.editFlag = model.option.hasEdit

        /**
         * 是否有弹出层
         * @type {Boolean}
         */
        this.dialogFlag = model.option.hasDialog

        /**
         * 是否生成components.js文件
         * @type {Boolean}
         */
        this.componentsFlag = this.dialogFlag
    }

    /**
     * 首页配置构建
     */
    builder () {
        try {
            this._createIndexFile()
            this._createDataFile()
            this._createMethodFile()
            this._createBeforeRouteEnterFile()
            this._createComponentsFile()
            this._createMixinFile()
            this._createCustomFilterFile()
            this._createQueryTableFile()
        } catch (e) {
            console.error(e)
        }
    }

    /**
     * 创建首页入口文件
     */
    _createIndexFile () {
        console.error('构建首页入口文件')
        const file = FileUtils.createFile(`${rootPath}/build/index/index.vue`)
        const dialog = this.dialogFlag ? Template.dialog() : ''

        const template = new Template('index')
        template.escape('dialog.tpl', dialog)
        template.writeIn(file)
    }

    /**
     * 创建首页data文件
     */
    _createDataFile () {
        console.error('构建首页data.js')
        const file = FileUtils.createFile(`${rootPath}/build/index/mixins/data.js`)
        const selection = this.selectionFlag ? 'selection:[],' : ''
        const dialogData = this.dialogFlag ? Template.dialogData() : ''

        const template = new Template('indexData')
        template.escape('selection.tpl', selection)
            .escape('dialog.data.tpl', dialogData)
        template.writeIn(file)
    }

    /**
     * 创建首页method文件
     * @param {Boolean}
     */
    _createMethodFile () {
        console.error('构建首页methods.js')
        const file = FileUtils.createFile(`${rootPath}/build/index/mixins/methods.js`)
        const dialogMethods = this.dialogFlag ? Template.dialogMethods() : ''

        const template = new Template('indexMethods')
        template.escape('dialog.methods.tpl', dialogMethods)
        template.writeIn(file)
    }

    /**
     * 创建activated文件
     * @deprecated
     */
    _createActivatedFile () {
        if (!this.activatedFlag) return
        console.error('构建首页activated.js')
        const file = FileUtils.createFile(`${rootPath}/build/index/mixins/activated.js`)
        const template = new Template('indexActivated')
        template.writeIn(file)
    }

    /**
     * 创建首页beforeRouteEnter文件
     */
    _createBeforeRouteEnterFile () {
        console.error('构建首页beforeRouteEnter.js')
        const file = FileUtils.createFile(`${rootPath}/build/index/mixins/beforeRouteEnter.js`)
        const template = new Template('indexBeforeRouteEnter')
        template.writeIn(file)
    }

    /**
     * 创建components文件
     */
    _createComponentsFile () {
        if (!this.componentsFlag) return
        console.error('构建首页components.js')
        const file = FileUtils.createFile(`${rootPath}/build/index/mixins/components.js`)
        const template = new Template('indexComponents')
        template.writeIn(file)
    }

    /**
     * 创建混合入口文件
     */
    _createMixinFile () {
        console.error('构建首页mixins.js')
        const file = FileUtils.createFile(`${rootPath}/build/index/mixins/index.js`)
        let content = Template.indexMixin()
        const importTemplate = []
        const propertyTemplate = []

        if (this.componentsFlag) {
            importTemplate.push(`import components from './components'`)
            propertyTemplate.push(`  components,`)
        }

        const template = new Template('indexMixin')
        template.escape('import', importTemplate.join('\n'))
            .escape('property', propertyTemplate.join('\n'))
        template.writeIn(file)
    }

    /**
     * 创建CustomFilter文件
     */
    _createCustomFilterFile () {
        console.error('构建首页custom-filter.js文件')
        const file = FileUtils.createFile(`${rootPath}/build/index/config/custom-filter.js`)
        const option = this.model.option

        const template = new Template('indexCustomFilter')
        template.escape('menu', this.menu.router)
            .escape('method', option.method)
            .escape('searchCode', option.searchCode)
        template.writeIn(file)
    }

    /**
     * 生成query-table
     */
    _createQueryTableFile () {
        console.error('构建首页query-table.js文件')
        const file = FileUtils.createFile(`${rootPath}/build/index/config/query-table.js`)
        const option = this.model.option
        const formTools = BuilderUtils.createFormTools(this.model.formToolList)
        const tools = BuilderUtils.createTools(this.model.toolList)
        const selection = this.selectionFlag ? Template.tableSelection() : ''
        const operation = this.editFlag ? Template.tableOperation() : ''

        const template = new Template('indexQueryTable')
        template.escape('customSearchCode', option.customSearchCode)
            .escape('customColumnCode', option.customColumnCode)
            .escape('method', option.method)
            .escape('formTools', formTools)
            .escape('selection', selection)
            .escape('tools', tools)
            .escape('operation', operation)
        template.writeIn(file)
    }
}

module.exports = IndexController
