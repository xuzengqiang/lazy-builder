/*
 * @fileOverview: 用于生成路由配置文件
 * @author: xuzengqiang
 * @date: 2018-06-07 11:29:05
 */
const FileUtils = require('../utils/FileUtils')
const fs = require('fs')
const rootPath = process.cwd()
const Template = require('../utils/template/Template')
const log4js = require('koa-log4')
const logger = log4js.getLogger('index')

class RouterController {
    /**
     * 构造函数
     * @param {Object} menu - 菜单配置
     */
    constructor(menu) {
        this.model = model
        this.menu = menu
        this.menuName = menu.name ? (menu.name + '').trim() : ''
    }

    /**
     * 路由配置构建
     */
    builder () {
        try {
            this._createIndexFile()
        } catch (e) {
            console.error(e)
        }
    }

    /**
     * 创建路由入口文件
     */
    _createIndexFile () {
        console.error('构建路由入口文件')
        const file = FileUtils.createFile(`${rootPath}/router/.vue`)
        FileUtils.createFile(`${rootPath}/build/index/${this.menu.name}首页.md`)
        const template = new Template('index')
        template.compile(file, {
            hasDialog: this.hasDialog
        })
    }
}

module.exports = IndexController
