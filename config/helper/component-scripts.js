/**
 * @fileOverview 组件js文件自动引入
 * @author xuzengqiang <253948113@qq.com>
 * @date 2018-06-03 06:02:46
 * @version 1.0.0
 */
const hbs = require('koahub-handlebars')
const fs = require('fs')
const path = require('path')
const rootPath = process.cwd()

/**
 * script tag
 * @param {String} path - 文件路径
 */
const script = path => `<script type="text/javascript" src="${path}.js"></script>`

hbs.registerHelper('component-scripts', () => {
  const basePath = `${rootPath}/src/components`
  const dirs = fs.readdirSync(basePath)

  let state
  let scripts = []
  dirs.forEach(name => {
    state = fs.statSync(`${basePath}/${name}`)
    if (state.isDirectory()) {
      scripts.push(script(`components/${name}/index`))
    }
  })

  scripts.push(script('components/index'))
  return new hbs.SafeString('\n' + scripts.join('\n'))
})
