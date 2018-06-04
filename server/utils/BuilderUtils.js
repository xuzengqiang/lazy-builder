/*
 * @fileOverview: 文件构建utils
 * @author: xuzengqiang
 * @date: 2018-06-04 10:19:58
 */
const fs = require('fs')
const path = require('path')
const Template = require('./template/Template')

class BuilderUtils {

    /**
     * 根据前端响应回来的formToolList转换为接口可识别的数组对象
     * @param {Array} formToolList
     * @return {Array}
     */
    static createFormTools (formToolList) {
        let formTools = []
        let content
        const formToolTemplate = Template.formToolsIndex()
        if (Array.isArray(formToolList) && formToolList.length) {
            formToolList.forEach(formTool => {
                switch (formTool.key) {
                    case 'refresh':
                        formTools.push(Template.formToolsRefresh())
                        break
                    case 'custom-filter':
                        formTools.push(Template.formToolsCustomFilter())
                        break
                    case 'query-table':
                        formTools.push(Template.formToolsQueryTable())
                        break
                    default:
                        content = Template.escape(formToolTemplate, 'label', formTool.label)
                        content = Template.escape(content, 'icon', formTool.icon)
                        content = Template.escape(content, 'disabled', formTool.disabled)
                        formTools.push(content)
                }
            })
        }
        console.error(formTools)
        return formTools.join(',')
    }

    /**
     * 根据前端响应回来的toolList转换为接口可识别的数组对象
     * @param {Array} toolList
     * @return {Array}
     */
    static createTools (toolList) {
        let tools = []
        let content
        const toolTemplate = Template.toolsIndex()
        if (Array.isArray(toolList) && toolList.length) {
            toolList.forEach(formTool => {
                content = Template.escape(toolTemplate, 'label', formTool.label)
                content = Template.escape(content, 'icon', formTool.icon)
                content = Template.escape(content, 'disabled', formTool.disabled)
                tools.push(content)
            })
        }
        console.error(tools)
        return tools.join(',')
    }
}

module.exports = BuilderUtils