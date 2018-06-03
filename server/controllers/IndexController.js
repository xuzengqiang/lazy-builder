/*
 * @fileOverview: 首页构建controller
 * @author: xuzengqiang
 * @date: 2018-05-31 16:14:41
 */
const FileUtils = require('../utils/file')
const fs = require('fs')
const rootPath = process.cwd()
const Template = require('../utils/template')
const log4js = require('koa-log4')
const logger = log4js.getLogger('index')

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
        this.selectionFlag = true

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
    builder() {
        try {
            this._createIndexFile()
            this._createDataFile()
            this._createMethodFile()
            this._createBeforeRouteEnterFile()
            this._createComponentsFile()
            this._createMixinFile()
            this._createCustomFilterFile()
        } catch (e) {
            console.error(e)
        }
    }

    /**
     * 创建首页入口文件
     */
    _createIndexFile() {
        console.error('构建首页入口文件')
        const file = FileUtils.createFile(`${rootPath}/build/index/index.vue`)
        const dialog = this.dialogFlag ? Template.dialog() : ''

        let content = Template.index()
        content = Template.escape(content, 'dialog.tpl', dialog)

        Template.writeFile(file, content)
    }

    /**
     * 创建首页data文件
     */
    _createDataFile() {
        console.error('构建首页data.js')
        const file = FileUtils.createFile(`${rootPath}/build/index/mixins/data.js`)
        const selection = this.selectionFlag ? 'selection:[],' : ''
        const dialogData = this.dialogFlag ? Template.dialogData() : ''

        let content = Template.indexData()
        content = Template.escape(content, 'selection.tpl', selection)
        content = Template.escape(content, 'dialog.data.tpl', dialogData)

        Template.writeFile(file, content)
    }

    /**
     * 创建首页method文件
     * @param {Boolean}
     */
    _createMethodFile() {
        console.error('构建首页methods.js')
        const file = FileUtils.createFile(`${rootPath}/build/index/mixins/methods.js`)
        const dialogMethods = this.dialogFlag ? Template.dialogMethods() : ''

        let content = Template.indexMethods()
        content = Template.escape(content, 'dialog.methods.tpl', dialogMethods)

        Template.writeFile(file, content)
    }

    /**
     * 创建activated文件
     * @deprecated
     */
    _createActivatedFile() {
        if (!this.activatedFlag) return
        console.error('构建首页activated.js')
        const file = FileUtils.createFile(`${rootPath}/build/index/mixins/activated.js`)
        Template.writeFile(file, Template.indexActivated())
    }

    /**
     *
     */
    _createBeforeRouteEnterFile() {
        console.error('构建首页beforeRouteEnter.js')
        const file = FileUtils.createFile(`${rootPath}/build/index/mixins/beforeRouteEnter.js`)
        Template.writeFile(file, Template.indexBeforeRouteEnter())
    }

    /**
     * 创建components文件
     */
    _createComponentsFile() {
        if (!this.componentsFlag) return
        console.error('构建首页components.js')
        const file = FileUtils.createFile(`${rootPath}/build/index/mixins/components.js`)
        Template.writeFile(file, Template.indexComponents())
    }

    /**
     * 创建混合入口文件
     */
    _createMixinFile() {
        console.error('构建首页mixins.js')
        const file = FileUtils.createFile(`${rootPath}/build/index/mixins/index.js`)
        let content = Template.indexMixin()
        const importTemplate = []
        const propertyTemplate = []

        if (this.componentsFlag) {
            importTemplate.push(`import components from './components'`)
            propertyTemplate.push(`  components,`)
        }

        content = Template.escape(content, 'import', importTemplate.join('\n'))
        content = Template.escape(content, 'property', propertyTemplate.join('\n'))
        Template.writeFile(file, content)
    }

    /**
     * 创建CustomFilter文件
     */
    _createCustomFilterFile() {
        console.error('构建首页custom-filter.js文件')
        const file = FileUtils.createFile(`${rootPath}/build/index/config/custom-filter.js`)
        const option = this.model.option
        let content = Template.indexCustomFilter()

        content = Template.escape(content, 'menu', this.menu.router)
        content = Template.escape(content, 'method', option.method)
        content = Template.escape(content, 'searchCode', option.searchCode)

        Template.writeFile(file, content)
    }
}

module.exports = IndexController
