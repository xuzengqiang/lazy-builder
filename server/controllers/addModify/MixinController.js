/*
 * @fileOverview: 混合controller
 * @author: xuzengqiang
 * @date: 2018-06-17 23:15:13
 * @description 用于生成mixins中的配置文件
 * @version 1.0.0
 * @since 1.0.2
 */
import BuilderError from '../../error/BuilderError'
import print from '../../utils/print'

class MixinController {
  /**
   * 构造函数
   * @param {Object} model - 请求的参数信息
   * @param {Object} menu - 菜单配置
   */
  constructor(model, menu) {
    this.model = model
    this.menu = menu

    /**
     * 是否有弹出窗
     * @type {Boolean}
     */
    this.hasDialog = model.option.hasDialog

    /**
     * 是否在弹窗内部
     * @type {Boolean}
     */
    this.inDialog = model.option.inDialog
  }

  /**
   * 开始构建
   * @description
   * 1、构建add.modify.js
   * 2、构建common.js
   * 3、构建modify.detail.js
   */
  builder () {
    try {
      print.out('开始构建mixins混合文件...')
      this._createAddModifyFile()
      this._createCommonFile()
      this._createModifyDetailFile()
      print.success('mixinx混合文件构建成功!')
    } catch (e) {
      print.error(e)
      new BuilderError('mixins混合文件构建失败!')
    }
  }

  /**
   * 构建add.modify.js
   */
  _createAddModifyFile () {
    print.out('构建add.modify.js配置文件')
    const file = FileUtils.createFile(`${rootPath}/build/mixins/add.modify.js`)
    const template = new Template('mixinsAddModify')
    template.compile(file, {
      hasDialog: this.hasDialog,
      inDialog: this.inDialog,
      router: this.menu.router
    })
  }

  /**
   * 构建common.js
   */
  _createCommonFile () {
    print.out('构建common.js配置文件')
    const file = FileUtils.createFile(`${rootPath}/build/mixins/common.js`)
    const template = new Template('mixinsCommon')
    template.compile(file, {
      hasDialog: this.hasDialog,
      inDialog: this.inDialog
    })
  }

  /**
   * 构建modify.detail.js
   */
  _createModifyDetailFile () {
    print.out('构建modify.detail.js配置文件')
    const file = FileUtils.createFile(`${rootPath}/build/mixins/modify.detail.js`)
    const template = new Template('mixinsModifyDetail')
    template.compile(file, {
      hasDialog: this.hasDialog,
      inDialog: this.inDialog,
      router: this.menu.router
    })
  }
}
