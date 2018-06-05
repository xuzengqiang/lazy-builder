/*
 * @fileOverview: 模板工具方法
 * @author: xuzengqiang
 * @date: 2018-06-04 10:23:29
 * 
 * @update xuzengqiang
 * @date 2018-6-5 00:26:38
 * @since 1.0.1
 * @description 采用artTemplate编译模板文件
 */
const fs = require('fs')
const moment = require('moment')
const path = require('path')
const TemplateEngine = require('./TemplateEngine').getInstance()
const rootPath = process.cwd()
const Handlebars = require('handlebars')
const artTemplate = require('art-template')
require('./helper')

const TemplateMapper = {
    index: 'index/index.hbs',
    indexMixin: 'index/mixins/index.hbs',
    indexData: 'index/mixins/data.hbs',
    indexMethods: 'index/mixins/methods.hbs',
    indexComponents: 'index/mixins/components.hbs',
    indexBeforeRouteEnter: 'index/mixins/beforeRouteEnter.hbs',
    indexCustomFilter: 'index/config/custom-filter.hbs',
    indexQueryTable: 'index/config/query-table.hbs',
    addIndex: 'add/index.hbs',
    configFormFields: 'config/form-fields.hbs',
    configRules: 'config/rules.hbs',
    configModel: 'config/model.hbs',
    mixinsAddModify: 'mixins/add.modify.hbs',
    mixinsModifyDetail: 'mixins/modify.detail.hbs',
    modifyIndex: 'modify/index.hbs',
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
     * 编译模板文件
     * @param {File} file - 文件信息
     * @param {Object} params - 参数信息
     * @since 1.0.0
     */
    compile (file, params = {}) {
        if (!file || typeof file.write !== 'function') {
            console.error('无效的文件信息,模板编译失败!')
            return
        }

        const template = Handlebars.compile(this.content)
        const author = fs
            .readFileSync(`${rootPath}/module.author`)
            .toString()
            .trim()

        const creationdate = moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
        params.author = author
        params.creationDate = creationdate

        try {
            const content = template(params)
            file.write(content)
        } catch (e) {
            console.error('模板编译失败,文件写入失败...')
            console.error(e)
        }
    }
}

for (let template in TemplateMapper) {
    Template[template] = () => {
        return TemplateEngine.cacheReadFile(template, TemplateMapper[template])
    }
}

module.exports = Template
