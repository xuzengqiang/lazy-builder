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
      fileName: ''
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
        rules: {
          fileName: [{
            required: true,
            message: '文件名称不能为空',
            trigger: 'blur'
          }]
        }
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
        value && (this.model = ModelConfig())
      }
    },
    methods: {
      setColumn () {
        this.$refs.form.validate(valid => {
          if (valid) {
            this.show = false
            this.$emit('set-column', {
              title: this.model.title,
              column: this.model.column,
              fileName: this.model.fileName
            })
          }
        })
      }
    }
  }

  window.ColumnConfigDialog = ColumnConfigDialog
})(window)
