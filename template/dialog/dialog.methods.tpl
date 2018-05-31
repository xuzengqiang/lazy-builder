/**
 * 显示弹出窗
 * @param {String} view - 需要显示的组件
 * @param {String} title - 弹出窗标题
 * @param {String} width - 弹出层宽度
 */
showDynamicDialog (view, title, width = '1200px') {
  Object.assign(this.dialogOption, {
    title: title,
    width: width,
    view: view,
    show: true
  })
},
/**
 * 关闭弹窗
 * @param {Boolean} needRrefresh - 是否需要刷新
 */
closeDynamicDialog (needRrefresh) {
  this.dialogOption = {
    show: false,
    view: null,
    title: '',
    width: '0px'
  }
  if (needRrefresh) {
    this.reload()
  }
},