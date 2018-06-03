/**
 * @fileOverview 组件自动注册
 * @author xuzengqiang <253948113@qq.com>
 * @date 2018-06-03 06:02:46
 * @version 1.0.0
 */
const hbs = require('koahub-handlebars')
const fs = require('fs')
const path = require('path')
const rootPath = process.cwd()

hbs.registerHelper('components', () => {
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
