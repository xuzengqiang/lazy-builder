/*
 * @fileOverview: 文件构建Controller
 * @author: xuzengqiang
 * @date: 2018-05-31 15:53:03
 */
const FileUtils = require('../utils/FileUtils')
const rootPath = process.cwd()
const IndexController = require('./IndexController')
const AddModifyController = require('./AddModifyController')
const DetailController = require('./DetailController')

class BuilderController {
    constructor(options) {
        this.options = options
        this.menu = options.menu
        this.indexModel = options.indexModel
        this.addModifyModel = options.addModifyModel
        this.detailModel = options.detailModel
    }

    /**
     * 构建项目文件夹
     */
    build () {
        this._indexBuilder()
        this._addModifyBuilder()
        this._detailBuilder()
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

    /**
     * 详情页构建
     * @date 2018-06-06 11:02:45
     */
    _detailBuilder () {
        const detailController = new DetailController(this.detailModel, this.addModifyModel, this.menu)
        detailController.builder()
    }
}

module.exports = BuilderController
