/**
 * @fileOverview DOM加载完成后的处理
 * @author xuzengqiang
 * @date 2018-05-23 11:55:20
 * @version 1.0.0
 */
;(window => {
    const toString = Object.prototype.toString
    const dom = {}
    let readyList = []

    /**
     * dom是否已经加载完成
     * @type {Boolean}
     */
    dom.isReady = false

    /**
     * 判断是否为一个方法
     * @param {Function} func - 需要验证的对象
     */
    dom.isFunction = func => toString.call(func) === '[object Function]'

    /**
     * 注册dom加载完成后的事件处理
     * @param {Function} complete - 方法
     */
    dom.ready = complete => {
        if (dom.isFunction(complete)) {
            dom.isReady ? complete() : readyList.push(complete)
        }
    }

    /**
     * DOM加载完成后的处理
     * @description 需要更新isReady的值,同时执行readyList队列里注册的方法
     */
    const domReady = complete => {
        if (dom.isReady) {
            console.error('dom已经加载完成')
            return
        }

        dom.isReady = true
        readyList.forEach(complete => complete())
        readyList = []
    }

    /**
     * 当DOM元素加载完成之后的处理
     */
    const completed = () => {
        document.removeEventListener('DOMContentLoaded', completed)
        window.removeEventListener('load', completed)
        domReady()
    }

    document.addEventListener('DOMContentLoaded', completed)
    window.addEventListener('load', completed)

    window.dom = dom
})(window)
