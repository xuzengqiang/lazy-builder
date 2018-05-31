/*
 * @fileOverview: 首页构建controller
 * @author: xuzengqiang
 * @date: 2018-05-31 16:14:41
 */
const FileUtils = require('../static/common/file')
const fs = require('fs')
const rootPath = process.cwd()
const Template = require('../static/common/template')
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
    builder () {
        try {
            this._createIndexFile()
            this._createDataFile()
            this._createMethodFile()
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

        let content = Template.index()
        content = Template.escape(content, 'dialog.tpl', dialog)

        file.write(content)
    }

    /**
     * 创建首页data文件
     */
    _createDataFile () {
        console.error('构建首页data.js')
        const file = FileUtils.createFile(`${rootPath}/build/index/mixins/data.js`)
        const selection = this.selectionFlag ? 'selection:[],' : ''
        const dialogData = this.dialogFlag ? Template.dialogData() : ''

        let content = Template.indexData()
        content = Template.escape(content, 'selection.tpl', selection)
        content = Template.escape(content, 'dialog.data.tpl', dialogData)

        file.write(content)
    }

    /**
     * 创建首页method文件
     * @param {Boolean} 
     */
    _createMethodFile () {
        console.error('构建首页methods.js')
        const file = FileUtils.createFile(`${rootPath}/build/index/mixins/methods.js`)
        const dialogMethods = this.dialogFlag ? Template.dialogMethods() : ''

        let content = Template.indexMethods()
        content = Template.escape(content, 'dialog.methods.tpl', dialogMethods)

        file.write(content)
    }

    /**
     * 创建混合入口文件
     */
    _createMixinFile (components, activated, computed) {

    }
}

module.exports = IndexController