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
    }

    /**
     * 首页配置构建
     */
    builder () {
        try {
            const file = FileUtils.createFile(rootPath + '/build/index/index.vue')
            const mixin = FileUtils.createFile(rootPath + '/build/index/mixins/index.js')
            this._createDataFile(true, true)
            FileUtils.createFile(rootPath + '/build/index/mixins/methods.js')
            FileUtils.createFile(rootPath + '/build/index/mixins/component.js')
            fs.readFile(rootPath + '/template/index/index.vue', (error, data) => {
                const fileTemplate = data.toString()
                fs.readFile(rootPath + '/template/dialog/dialog.tpl', (error, data) => {
                    file.write(fileTemplate.replace('[[dialog.tpl]]', data.toString()))
                })
            })
            console.error('创建文件')
        } catch (e) {
            console.error(e)
        }
    }

    /**
     * 创建首页data文件
     * @param {Boolean} selection - 是否生成selection
     * @param {Boolean} dialog - 是否有生成dialog
     */
    _createDataFile (selection, dialog) {
        const file = FileUtils.createFile(rootPath + '/build/index/mixins/data.js')
        const dataTemplate = Template.indexData()
        let fileContent = dataTemplate.replace('[[selection.tpl]]', selection ? 'selection:[],' : '')

        if (dialog) {
            const dialogTemplate = Template.dialogData()
            fileContent = fileContent.replace('[[dialog.data.tpl]]', dialog ? dialogTemplate : '')
        }
        file.write(fileContent)
    }

    /**
     * 创建混合入口文件
     */
    _createMixinFile () {

    }
}

module.exports = IndexController