/*
 * @fileOverview: StringUtils.js
 * @author: xuzengqiang
 * @date: 2018-06-04 21:37:03
 */
class StringUtils {
  static hump (string) {
    return string.replace(/-([a-z])|(\d)/ig, (str, char, number) => {
      if (char) {
        return char.toUpperCase()
      } else {
        return String.fromCharCode(parseInt(number) + 97)
      }
    })
  }
}

module.exports = StringUtils
