/*
 * @fileOverview: 模板工具方法
 * @author: xuzengqiang
 * @date: 2018-06-04 10:23:29
 */
const fs = require('fs')
const moment = require('moment')
const path = require('path')
const TemplateEngine = require('./TemplateEngine').getInstance()
const rootPath = process.cwd()

const TemplateMapper = {
    index: 'index/index.vue',
    indexMixin: 'index/mixins/index.tpl',
    indexData: 'index/mixins/data.tpl',
    indexMethods: 'index/mixins/methods.tpl',
    indexActivated: 'index/mixins/activated.tpl',
    indexComponents: 'index/mixins/components.tpl',
    indexBeforeRouteEnter: 'index/mixins/beforeRouteEnter.tpl',
    indexCustomFilter: 'index/config/custom-filter.tpl',
    indexQueryTable: 'index/config/query-table.tpl',
    dialog: 'dialog/dialog.tpl',
    dialogData: 'dialog/dialog.data.tpl',
    dialogMethods: 'dialog/dialog.methods.tpl'
}

class Template {

    /**
     * 构造函数
     * @param {String} template - 模板key
     * @example
     * new Template('index')
     */
    constructor(template) {
        template = template ? (template + '').trim() : ''
        if (template && TemplateMapper.hasOwnProperty(template)) {
            this.content = TemplateEngine.cacheReadFile(template, TemplateMapper[template])
        } else {
            console.error('无效的模板名称')
            this.content = ''
        }
    }

    /**
     * 转译
     * @param {String} content - 原始内容
     * @param {String} name - 模板名称
     * @param {String} value - 替换内容
     */
    static escape (content, name, value) {
        return content.replace(`[[${name}]]`, value)
    }

    /**
     * 写文件
     * @param {File} file - 文件信息
     * @param {String} content - 文件信息
     */
    static writeFile (file, content) {
        const author = fs
            .readFileSync(`${rootPath}/module.author`)
            .toString()
            .trim()

        const currentTime = moment(new Date()).format('YYYY-MM-DD HH:mm:ss')

        content = content.replace(`[[author]]`, 'xuzengqiang')
        content = content.replace(`[[creationDate]]`, currentTime)
        file.write(content)
    }

    /**
     * 获取模板内容
     * @return {String}
     */
    getContent () {
        return this.content
    }

    /**
     * 转义
     * @param {String} name - 模板名称
     * @param {String} value - 替换内容
     * @chainable
     */
    escape (...params) {
        this.content = Template.escape(this.content, ...params)
        return this
    }

    /**
     * 模板写入文件
     * @param {File} file - 文件信息
     * @description 会自动解析注释文件
     */
    writeIn (file) {
        if (!file || typeof file.write !== 'function') {
            console.error('无效的文件信息,写文件失败')
            return
        }

        Template.writeFile(file, this.content)
    }
}

for (let template in TemplateMapper) {
    Template[template] = () => {
        return TemplateEngine.cacheReadFile(template, TemplateMapper[template])
    }
}

module.exports = Template
