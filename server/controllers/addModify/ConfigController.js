/*
 * @fileOverview: config文件夹生成
 * @author: xuzengqiang
 * @date: 2018-06-17 19:37:04
 * @since 1.0.2
 * @version 1.0.0
 */
import BuilderError from '../../error/BuilderError'
import print from '../../utils/print'

class ConfigController {
  /**
   * 构造函数
   */
  constructor() {

  }

  /**
   * 开始构建
   * @description
   * 1、生成model.js
   * 2、生成layout.js
   * 3、生成rules.js
   * 4、生成字段配置文件
   */
  builder () {
    try {
      print.out('开始构建config配置文件...')
      this._createModelFile()
      this._createLayoutFile()
      this._createRulesFile()
      this._createFieldFiles()
      print.success('config配置文件构建成功!')
    } catch (e) {
      print.error(e)
      new BuilderError('config配置文件构建失败!')
    }
  }

  /**
   * 创建model配置文件
   */
  _createModelFile () {

  }

  /**
   * 创建验证规则文件
   */
  _createRulesFile () {
    print.out('创建rules.js配置文件')
    const file = FileUtils.createFile(`${rootPath}/build/config/rules.js`)
    const template = new Template('configRules')
    template.compile(file)
  }

  /**
   * 创建布局文件
   */
  _createLayoutFile () {

  }

  /**
   * 创建字段配置文件
   */
  _createFieldFiles () {

  }
}

module.exports = ConfigController
