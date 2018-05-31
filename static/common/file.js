/*
 * @fileOverview: node.js 文件操作
 * @author: xuzengqiang
 * @date: 2018-05-31 15:49:38
 */
const fs = require('fs')
const FileUtils = {}

/**
 * 创建文件目录
 * @param {String} path - 文件路径
 */
FileUtils.mkdir = (path, callback) => {
    fs.exists(path, exists => {
        if (!exists) {
            fs.mkdir(path, error => {
                if (error) {
                    callback(error)
                    return
                }
                callback()
            })
            return
        }
        callback()
    })
}

module.exports = FileUtils