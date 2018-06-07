/*
 * @fileOverview: 文件构建Controller
 * @author: xuzengqiang
 * @date: 2018-05-31 15:53:03
 * 
 * @update xuzengqiang
 * @date 2018-6-8 00:43:17
 * @since 1.0.1
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
   * 构建完整项目文件夹
   * @since 1.0.1
   * @description 支持生成完整的配置文件
   */
  completeBuilder() {
    this.indexBuilder()
    this.addModifyBuilder()
    this.detailBuilder()
  }

  /**
   * 首页配置文件构建
   * @since 1.0.1
   * @description 支持单独生成首页配置文件
   */
  indexBuilder() {
    const indexController = new IndexController(this.indexModel, this.menu)
    indexController.builder()
  }

  /**
   * 新增和编辑页单独构建
   * @date 2018-06-04 20:43:28
   */
  addModifyBuilder() {
    const addModifyController = new AddModifyController(this.addModifyModel, this.menu)
    addModifyController.builder()
  }

  /**
   * 详情页构建
   * @date 2018-06-06 11:02:45
   */
  detailBuilder() {
    const detailController = new DetailController(this.detailModel, this.addModifyModel, this.menu)
    detailController.builder()
  }
}

module.exports = BuilderController
