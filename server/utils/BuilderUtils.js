/*
 * @fileOverview: 文件构建utils
 * @author: xuzengqiang
 * @date: 2018-06-04 10:19:58
 */
const fs = require('fs')
const path = require('path')
const Template = require('./template/Template')
const StringUtils = require('./StringUtils')

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

    /**
     * 生成FormFieldsRender
     * @param {Array} columns - 栏目信息
     */
    static createFormFieldsRender (columns) {
        if (!Array.isArray(columns)) {
            return ''
        }

        let container = []
        columns.forEach(column => container.push(this.createSingleFormFieldsRender(column)))
        return container.join('\n')
    }

    /**
     * 生成单个FormFieldsRender
     * @param {Object} column - 栏目信息
     */
    static createSingleFormFieldsRender (column) {
        const template = new Template('formFieldsRender')
        const title = column.title ? (column.title + '').trim() : ''
        const rightcontent = column.rightcontent
        const leftcontent = column.leftcontent
        const main = column.main
        const hasLeftContent = leftcontent && /^[1-9]]\d*$/.test(leftcontent.totalspan)
        const hasRightContent = rightcontent && /^[1-9]]\d*$/.test(rightcontent.totalspan)
        const hasMain = main && /^[1-9]\d*$/.test(main.totalspan)

        let content = []
        if (!title) {
            content.push('<form-fields-render :model="model"')
            content.push(`                    :title="${title}"`)
            if (hasLeftContent) {
                content.push(`                    :leftspan=${leftcontent.totalspan}`)
            }
            if (hasRightContent) {
                content.push(`                    :rightspan=${rightcontent.totalspan}`)
            }
            content.push('>')
            content.push(BuilderUtils._getFormFieldsRender(leftcontent, 'leftcontent'))
            content.push(BuilderUtils._getFormFieldsRender(main))
            content.push(BuilderUtils._getFormFieldsRender(rightcontent, 'rightcontent'))
            content.push('</form-fields-render>')
        }

        return content.join('\n')
    }

    /**
     * 创建
     */
    static _getFormFieldsRender (subcolumn, location = 'main') {
        if (!subcolumn) {
            return ''
        }
        const slot = location
        const fields = subcolumn.fileName ? StringUtils.hump(subcolumn.fileName) + 'Fields' : ''
        const content = []
        if (subcolumn && subcolumn.fields.length) {
            content.push('<form-fields-render :model="model"')
            if (location !== 'main') {
                content.push('                    slot="${slot}"')
            }
            content.push(`                    :fields="${fields}"`)
            if (subcolumn.title) {
                content.push(`                    :title="${title}"`)
            }
            content.push('>')
            content.push('</form-fields-render')
        } else if (location !== 'main') {
            content.push(`<template slot="${slot}"></template>`)
        }
        return content.join('\n')
    }
}

module.exports = BuilderUtils