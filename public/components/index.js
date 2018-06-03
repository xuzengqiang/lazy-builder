/**
 * @fileOverview 组件注册
 * @author xuzengqiang <253948113@qq.com>
 * @date 2018-06-02 16:03:06
 * @version 1.0.0
 */
const components = [
    FormFieldRender,
    FormFieldDialog,
    AddColumnDialog,
    DialogFooter,
    MenuConfig,
    FormToolDialog
]

components.forEach(component => Vue.component(component.name, component))
