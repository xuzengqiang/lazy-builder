/**
 * @fileOverview 首页功能拆分
 * @author xuzengqiang
 * @date 2018-6-7 23:53:38
 * @version 1.0.0
 */
;(window => {
  /**
   * 是否数组
   * @type {Array}
   */
  const yesOrNo = [
    {
      label: '是',
      value: true
    },
    {
      label: '否',
      value: false
    }
  ]

  const AddModifyMixin = {
    data() {
      return {
        addModifyModel: {
          columns: [],
          option: {
            hasDialog: false,
            inDialog: false
          }
        },
        yesOrNo
      }
    },
    methods: {
      /**
       * 栏目点击事件处理
       * @param {Object} column - 栏目信息
       */
      columnClicked(column) {
        console.error(column)
      },

      /**
       * 删除当前栏目
       * @param {Object} column - 栏目信息
       * @param {Integer} index - 当前栏目的索引
       */
      deleteColumn(column, index) {
        this.$confirm('删除之后的栏目无法恢复,确定删除吗?', '温馨提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(data => {
          this.addModifyModel.columns.splice(index, 1)
        })
      },

      /**
       * 修改栏目信息
       * @param {Object} column - 栏目信息
       * @param {Integer} index - 当前栏目的索引
       */
      editColumn(column, index) {
        this.$refs.columnDialog.show = true
      }
    }
  }

  window.AddModifyMixin = AddModifyMixin
})(window)
