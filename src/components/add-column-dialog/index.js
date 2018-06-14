/*
 * @fileOverview: 栏目新增
 * @author: xuzengqiang
 * @date: 2018-06-02 17:49:18
 */
;(window => {
  const DEFAULT_COLUMN = 4

  const getModel = totalspan => {
    return {
      title: '',
      fields: [],
      fileName: '',
      fieldsConfig: '',
      column: DEFAULT_COLUMN,
      totalspan: totalspan,
      // @fixed 从缓存中获取之后,无法恢复可编辑状态的BUG
      // created: false
      created: true
    }
  }

  const AddColumnDialog = {
    template: '#add-column-dialog-template',
    name: 'AddColumnDialog',
    data() {
      return {
        layout: 'one-column',
        show: false,
        column: 12,
        title: ''
      }
    },
    watch: {
      show(value) {
        if (value) {
          this.title = ''
          this.column = 12
        }
      }
    },
    methods: {
      addColumn() {
        const column = this.column
        let childrens = []

        // 生成子栏目
        switch (this.layout) {
          case 'one-column':
            childrens.push({
              span: 24
            })
            break
          case 'two-column':
            childrens.push({
              span: this.column
            })
            childrens.push({
              span: 24 - this.column
            })
        }

        this.show = false
        this.$emit('add-column', {
          title: this.title,
          cols: childrens,
          layout: this.layout
        })
      },
      /**
       * 点击布局方式之后的处理
       * @param {String} layout - 布局方式
       */
      layoutClicked(layout) {
        this.layout = layout
        if (layout === 'two-column') {
          this.column = 12
        }
      }
    }
  }

  window.AddColumnDialog = AddColumnDialog
})(window)
