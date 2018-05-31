/*
 * @fileOverview: node.js 文件操作
 * @author: xuzengqiang
 * @date: 2018-05-31 15:49:38
 */
const fs = require('fs')
const path = require('path')
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

/**
 * 创建文件夹.
 * @param {String} dirpath - 文件路径
 * @description 如果父目录不存在则创建
 */
FileUtils.createFolder = (dirpath) => {
    if (!dirpath) return
    const sep = path.sep
    const folders = path.dirname(dirpath).split(sep)
    let p = ''
    while (folders.length) {
        p += folders.shift() + sep
        if (!fs.existsSync(p)) {
            fs.mkdirSync(p)
        }
    }
}

/**
 * 创建文件
 * @param {String} filepath - 文件路径
 * @param {String} encoding - 编码
 */
FileUtils.createFile = (filepath, encoding = 'utf8') => {
    if (!filepath) return null

    try {
        FileUtils.createFolder(filepath)
        return fs.createWriteStream(filepath, encoding)
    } catch (e) {
        console.error(e)
        return null
    }
}

/**
 * 读取模板文件
 */
FileUtils.readTemplate


module.exports = FileUtils