/*
 * @fileOverview: 模板文件读取
 * @author: xuzengqiang
 * @date: 2018-05-31 17:57:43
 */
const FileUtils = require('./file')
const fs = require('fs')
const moment = require('moment')
const rootPath = process.cwd()

const Template = {}
const TemplateEngine = {}
const TEMPLATE_PATH = `${rootPath}/template/`
let templates = []

/**
 * 读取模板配置文件
 * @param {String} filepath - 文件路径
 */
TemplateEngine.readFile = filepath => {
    return fs.readFileSync(TEMPLATE_PATH + filepath)
}

/**
 * 模板文件缓存
 * @param {String} key - 主键
 * @param {String} filepath - 文件路径
 */
TemplateEngine.cacheReadFile = (key, filepath) => {
    if (templates[key]) {
        console.error(`从缓存中读取模板文件:${TEMPLATE_PATH}${filepath}`)
        return templates[key]
    }
    try {
        console.error(`读取模版文件:${TEMPLATE_PATH}${filepath}`)
        const file = TemplateEngine.readFile(filepath)
        templates[key] = file.toString()
    } catch (e) {
        console.error(`读取模板文件${TEMPLATE_PATH}${filepath}失败:`)
        console.error(e)
        templates[key] = null
    }
    return templates[key]
}

const TemplateMapper = {
    index: 'index/index.vue',
    indexMixin: 'index/mixins/index.tpl',
    indexData: 'index/mixins/data.tpl',
    indexMethods: 'index/mixins/methods.tpl',
    indexActivated: 'index/mixins/activated.tpl',
    indexComponents: 'index/mixins/components.tpl',
    indexBeforeRouteEnter: 'index/mixins/beforeRouteEnter.tpl',
    indexCustomFilter: 'index/config/custom-filter.tpl',
    dialog: 'dialog/dialog.tpl',
    dialogData: 'dialog/dialog.data.tpl',
    dialogMethods: 'dialog/dialog.methods.tpl'
}

for (let template in TemplateMapper) {
    Template[template] = () => {
        return TemplateEngine.cacheReadFile(template, TemplateMapper[template])
    }
}

/**
 * 转译
 * @param {String} content - 原始内容
 * @param {String} name - 模板名称
 * @param {String} value - 替换内容
 */
Template.escape = (content, name, value) => content.replace(`[[${name}]]`, value)

/**
 * 写文件
 * @param {File} file - 文件信息
 * @param {String} content - 文件信息
 */
Template.writeFile = (file, content) => {
    const author = fs
        .readFileSync(`${rootPath}/module.author`)
        .toString()
        .trim()

    console.error('配置的作者名称为:' + author)
    const currentTime = moment(new Date()).format('YYYY-MM-DD HH:mm:ss')

    content = content.replace(`[[author]]`, 'xuzengqiang')
    content = content.replace(`[[creationDate]]`, currentTime)
    file.write(content)
}

module.exports = Template
