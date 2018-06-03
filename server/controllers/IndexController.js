/*
 * @fileOverview: 首页构建controller
 * @author: xuzengqiang
 * @date: 2018-05-31 16:14:41
 */
const FileUtils = require('../utils/file')
const fs = require('fs')
const rootPath = process.cwd()
const Template = require('../utils/template')
class IndexController {
    /**
     * 构造函数
     * @param {Boolean} unifile - 是否生成单文件
     */
    constructor(unifile) {
        this.unifile = unifile || false

        /**
         * 是否生成复选框
         * @type {Boolean}
         */
        this.selectionFlag = true

        /**
         * 是否有弹出层
         * @type {Boolean}
         */
        this.dialogFlag = true

        /**
         * 是否生成components.js文件
         * @type {Boolean}
         */
        this.componentsFlag = true

        /**
         * 是否生成activated.js文件
         * @type {Boolean}
         */
        this.activatedFlag = true
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
            this._createActivatedFile()
            this._createComponentsFile()
            this._createMixinFile()
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
        if (this.activatedFlag) {
            importTemplate.push(`import activated from './activated'`)
            propertyTemplate.push(`  activated,`)
        }

        content = Template.escape(content, 'import', importTemplate.join('\n'))
        content = Template.escape(content, 'property', propertyTemplate.join('\n'))
        Template.writeFile(file, content)
    }
}

module.exports = IndexController
