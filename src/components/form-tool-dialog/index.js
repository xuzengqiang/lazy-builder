/*
 * @fileOverview: formTools弹出层组件
 * @author: xuzengqiang
 * @date: 2018-06-03 14:29:54
 */
; (window => {
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

  /**
   * model配置
   * @property {String} name - 按钮名称
   * @property {String} icon - 按钮图标
   * @property {String} disabled - 是否禁用
   */
  const ModelConfig = () => {
    return {
      name: '',
      icon: '',
      disabled: false
    }
  }

  const FormToolDialog = {
    template: '#form-tool-dialog-template',
    name: 'FormToolDialog',
    data () {
      return {
        model: ModelConfig(),
        show: false,
        yesOrNo
      }
    },
    watch: {
      show (value) {
        value && (this.model = ModelConfig())
      }
    },
    methods: {
      /**
       * 增加FormTool按钮
       */
      addFormTool () {
        this.show = false
        this.$emit('add-form-tool', this.model)
      },
      /**
       * 搜索图标
       * @param {String} name - 图标
       * @param {Function} callback - 搜索完成的回掉
       */
      iconSearch (name, callback) {
        let matchs = IconSearch(name)
        let icons = []
        matchs.forEach(icon => {
          icons.push({
            value: icon
          })
        })

        return callback(icons)
      }
    }
  }

  window.FormToolDialog = FormToolDialog
})(window)
