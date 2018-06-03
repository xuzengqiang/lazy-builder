/**
 * @fileOverview 组件注册
 * @author xuzengqiang <253948113@qq.com>
 * @date 2018-06-03 06:05:27
 * @version 1.0.0
 */
const components = [FormFieldRender, FormFieldDialog, AddColumnDialog, DialogFooter, MenuConfig, FormToolDialog, ToolDialog]

components.forEach(component => Vue.component(component.name, component))
