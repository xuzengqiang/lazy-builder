/*
 * @fileOverview: 栏目标题组件.md
 * @author: xuzengqiang
 * @date: 2018-06-15 16:46:29
 */
(window => {
  const ColumnTitleComponent = {
    template: '#column-title-template',
    name: 'ColumnTitle',
    data () {
      return {}
    },
    props: {
      label: {
        type: [String, Boolean, Number]
      }
    }
  }

  window.ColumnTitleComponent = ColumnTitleComponent
})(window)
