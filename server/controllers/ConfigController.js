/*
 * @fileOverview: config文件夹生成
 * @author: xuzengqiang
 * @date: 2018-06-17 19:37:04
 * @since 1.0.2
 * @description
 * 1、生成model.js
 * 2、生成layout.js
 * 3、生成rules.js
 * 4、生成字段配置文件
 */


class ConfigController {
  /**
   * 构造函数
   */
  constructor() {

  }

  builder () {
    try {
      this._createModelFile()
      this._createLayoutFile()
      this._createRulesFile()
      this._createFieldFiles()
    } catch (e) {
      console.error(e)
    }
  }

  /**
   * 创建model配置文件
   */
  _createModelFile () {

  }

  /**
   * 创建布局文件
   */
  _createLayoutFile () {

  }

  /**
   * 创建验证规则文件
   */
  _createRulesFile () {

  }

  /**
   * 创建字段配置文件
   */
  _createFieldFiles () {

  }
}

module.exports = ConfigController
