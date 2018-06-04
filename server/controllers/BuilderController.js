/*
 * @fileOverview: 文件构建Controller
 * @author: xuzengqiang
 * @date: 2018-05-31 15:53:03
 */
const FileUtils = require('../utils/FileUtils')
const rootPath = process.cwd()
const IndexController = require('./IndexController')
const AddModifyController = require('./AddModifyController')

class BuilderController {
    constructor(options) {
        this.options = options
        this.menu = options.menu
        this.indexModel = options.indexModel
        this.addModifyModel = options.addModifyModel
    }

    /**
     * 构建项目文件夹
     */
    build () {
        this._indexBuilder()
        this._addModifyBuilder()
    }

    /**
     * 构建首页
     */
    _indexBuilder () {
        const indexController = new IndexController(this.indexModel, this.menu)
        indexController.builder()
    }

    /**
     * 构建新增和编辑页
     * @date 2018-06-04 20:43:28
     */
    _addModifyBuilder () {
        const addModifyController = new AddModifyController(this.addModifyModel, this.menu)
        addModifyController.builder()
    }
}

module.exports = BuilderController
