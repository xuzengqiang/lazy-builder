/*
 * @fileOverview: 子栏目配置
 * @author: xuzengqiang
 * @date: 2018-06-04 16:45:59
 */
(window => {
  const ModelConfig = () => {
    return {
      title: '',
      column: 6,
      fileName: '',
      pane: false,
      panes: []
    }
  }

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

  const ColumnConfigDialog = {
    template: '#column-config-dialog-template',
    name: 'ColumnConfigDialog',
    data () {
      return {
        model: ModelConfig(),
        show: false,
        yesOrNo,
        paneName: '',
        paneInputVisible: false,
        rules: {}
      }
    },
    /**
     * 属性列表
     * @property {Boolean} hasTitle - 父栏目是否存在标题
     */
    props: {
      hasTitle: Boolean
    },
    watch: {
      show (value) {
        value && (this.model = ModelConfig(), this.paneName = '')
      }
    },
    methods: {
      setColumn () {
        this.$refs.form.validate(valid => {
          if (valid) {
            // 如果是选项卡状态,则选项卡不能为空
            if (this.model.pane) {
              if (this.model.panes.length == 0) {
                this.$message.warning('对不起,至少添加一个选项卡!')
                return
              }
            } else {
              if (!this.model.fileName) {
                this.$message.warning('文件名称不能为空!')
                return
              }
            }

            this.show = false
            this.$emit('set-column', {
              title: this.model.title,
              column: this.model.column,
              fileName: this.model.fileName,
              pane: this.model.pane,
              panes: this.model.panes
            })
          }
        })
      },
      /**
       * 新增pane
       * @since 1.0.2
       */
      addPane () {
        let paneName = this.paneName ? (this.paneName + '').trim() : ''
        if (paneName) {
          this.model.panes.push(paneName)
        }
        this.paneInputVisible = false
        this.paneName = ''
      },
      /**
       * 移除pane
       * @param {Integer} index - 当前panel索引
       * @since 1.0.2
       */
      removePane (index) {
        this.model.panes.splice(index, 1)
      },
      /**
       * 显示pane
       * @since 1.0.2
       */
      showPaneInput () {
        this.paneInputVisible = true
        this.$nextTick(_ => {
          this.$refs.savePaneInput.$refs.input.focus()
        })
      }
    }
  }

  window.ColumnConfigDialog = ColumnConfigDialog
})(window)
