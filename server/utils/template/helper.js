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

Handlebars.registerHelper('not_null_array', function (array, options) {
    if (Array.isArray(array) && array.length) {
        return options.fn(this)
    } else {
        return options.inverse(this)
    }
})