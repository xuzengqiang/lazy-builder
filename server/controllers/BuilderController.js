/*
 * @fileOverview: 文件构建Controller
 * @author: xuzengqiang
 * @date: 2018-05-31 15:53:03
 */
const FileUtils = require('../utils/file')
const rootPath = process.cwd()
const IndexController = require('./IndexController')

class BuilderController {
    constructor(options) {
        this.options = options
        this.menu = options.menu
        this.indexModel = options.indexModel
    }

    /**
     * 构建项目文件夹
     */
    build() {
        const indexController = new IndexController(this.indexModel, this.menu)
        indexController.builder()
    }

    /**
     * 构建首页
     */
    indexBuilder() {}

    /**
     * 构建新增和编辑页
     */
}

module.exports = BuilderController
