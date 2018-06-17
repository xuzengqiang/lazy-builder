/*
 * @fileOverview: 文件构建失败
 * @author: xuzengqiang
 * @date: 2018-06-17 22:09:40
 * @since 1.0.2
 */
class BuilderError extends Error {

  /**
   * 构造函数
   * @param {String} message - 异常信息
   * @param {Object} constructorOpt
   */
  constructor(message, constructorOpt) {
    // @TODO
    Error.captureStackTrace(this, constructorOpt || this)
    this.message = message
  }

}

BuilderError.prototype.name = 'Builder Error'

module.export = BuilderError
