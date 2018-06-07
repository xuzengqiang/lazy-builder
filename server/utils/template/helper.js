/*
 * @fileOverview: 注册handlebars helper
 * @author: xuzengqiang
 * @date: 2018-06-05 10:25:01
 */
const Handlebars = require('handlebars')

/**
 * 注册比较helper
 * @example
 * {{#equal key 'refresh'}}
 * ...
 * {{#else}}
 * ...
 * {{/euqal}}
 */
Handlebars.registerHelper('equal', function (value1, value2, options) {
    if (value1 == value2) {
        return options.fn(this)
    } else {
        return options.inverse(this)
    }
})

/**
 * 注册比较helper
 * @example
 * {{#not_equal key 'refresh'}}
 * ...
 * {{#else}}
 * ...
 * {{/not_equal}}
 */
Handlebars.registerHelper('not_equal', function (value1, value2, options) {
    if (value1 != value2) {
        return options.fn(this)
    } else {
        return options.inverse(this)
    }
})

/**
 * 注册比较helper
 * @example
 * {{#greater_than array.length 0}}
 * ...
 * {{#else}}
 * ...
 * {{/greater_than}}
 */
Handlebars.registerHelper('greater_than', function (value1, value2, options) {
    if (value1 > value2) {
        return options.fn(this)
    } else {
        return options.inverse(this)
    }
})

/**
 * 注册比较helper
 * @example
 * {{#less_than array.length 10}}
 * ...
 * {{#else}}
 * ...
 * {{/less_than}}
 */
Handlebars.registerHelper('less_than', function (value1, value2, options) {
    if (value1 < value2) {
        return options.fn(this)
    } else {
        return options.inverse(this)
    }
})

/**
 * 判断是否是数组最后一个索引
 */
Handlebars.registerHelper('array_last_index', function (array, index, options) {
    if (/^(0|[1-9]\d*)$/i.test(index)) {
        index = parseInt(index)
        if (Array.isArray(array) && array.length && array.length - 1 === index) {
            return options.fn(this)
        }
    }
    return options.inverse(this)
})

/**
 * hump,caml-case转驼峰
 */
Handlebars.registerHelper('hump', function (string, options) {
    string = string ? (string + '').trim() : ''
    if (string) {
        string = string.replace(/-([a-z])|(\d)/ig, (str, char, number) => {
            if (char) {
                return char.toUpperCase()
            } else {
                return String.fromCharCode(parseInt(number) + 97)
            }
        })
    }
    return string
})

Handlebars.registerHelper('not_null_array', function (array, options) {
    if (Array.isArray(array) && array.length) {
        return options.fn(this)
    } else {
        return options.inverse(this)
    }
})