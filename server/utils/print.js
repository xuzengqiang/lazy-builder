/*
 * @fileOverview: 控制台输出优化
 * @author: xuzengqiang
 * @date: 2018-06-17 22:55:15
 * @version 1.0.0
 * @since 1.0.2
 * @see chalk相关资料{@link https://blog.csdn.net/sqrtsix/article/details/76615630}
 */
const symbols = require('log-symbols')
const chalk = require('chalk')

class Print {

  /**
   * 普通文本输出
   * @param {...} messages - 需要输出的数据信息
   */
  static out (...messages) {
    console.log(...messages)
  }

  /**
   * 输出成功信息
   * @param {...} messages - 需要输出的数据信息
   */
  static success (...messages) {
    console.log(symbols.success, chalk.green(...messages))
  }

  /**
   * 输出错误信息
   * @param {...} messages - 需要输出的数据信息
   */
  static error (...messages) {
    console.log(symbols.error, chalk.red(...messages))
  }
}

module.exports = Print
