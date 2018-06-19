/*
 * @fileOverview: 注册handlebars helper
 * @author: xuzengqiang
 * @date: 2018-06-05 10:25:01
 */
const Handlebars = require('handlebars')
const print = require('../../utils/print')

/**
 * 判断索引是否为数组最后的索引
 * @param {Array} array - 数组信息
 * @param {Integer} index - 索引信息
 * @return {Boolean}
 */
const isArrayLastIndex = (array, index) => {
  if (/^(0|[1-9]\d*)$/i.test(index)) {
    index = parseInt(index)
    if (Array.isArray(array) && array.length && array.length - 1 === index) {
      return true
    }
  }
  return false
}

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
  return isArrayLastIndex(array, index) ? options.fn(this) : options.inverse(this)
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

/**
 * 判断是否为一个数组的最后索引.
 * @description 如果不是,加上',',否则不加
 */
Handlebars.registerHelper('end_comma', function (array, index, options) {
  return isArrayLastIndex(array, index) ? '' : ','
})
