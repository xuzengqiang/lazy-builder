/**
 * @fileOverview 组件注册
 * @author xuzengqiang <253948113@qq.com>
 * @date 2018-06-03 06:05:27
 * @version 1.0.0
 */
const components = [
  FormFieldRender,
  AddFieldDialog,
  AddColumnDialog,
  DialogFooter,
  MenuConfig,
  FormToolDialog,
  ToolDialog,
  ColumnConfigDialog,
  FieldColumnComponent,
  TabColumnComponent,
  ColumnTitleComponent
]

components.forEach(component => Vue.component(component.name, component))
