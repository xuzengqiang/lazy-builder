/*
 * @fileOverview: 首页构建controller
 * @author: xuzengqiang
 * @date: 2018-05-31 16:14:41
 */
const FileUtils = require('../static/common/file')
const rootPath = process.cwd()
class IndexController {
    /**
     * 构造函数 
     * @param {Boolean} unifile - 是否生成单文件
     */
    constructor(unifile) {
        this.unifile = unifile || false
    }

    /**
     * 首页配置构建
     */
    builder () {
        FileUtils.mkdir(rootPath + '/build', error => {
            if (error) {
                console.error(error)
            } else {
                console.error('builder')
            }
        })
    }
}

module.exports = IndexController