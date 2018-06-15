/*
 * @fileOverview: 表单字段处理
 * @author: xuzengqiang
 * @date: 2018-06-02 16:01:31
 */
; (window => {
  const hump = string => {
    return string.replace(/-([a-z])|(\d)/gi, (str, char, number) => {
      if (char) {
        return char.toUpperCase()
      } else if (number) {
        return String.fromCharCode(parseInt(number) + 97)
      }
    })
  }

  const FormFieldRender = {
    template: '#form-field-render-template',
    name: 'FormFieldRender',
    data () {
      return {
        dialogVisible: false,
        status: 'setting',
        fields: [],
        title: '',
        focused: true,
        dialogData: null,
        mode: Mode.ADD,
        column: DEFAULT_COLUMN
      }
    },
    /**
     * 属性列表
     * @property {Object} model - 模块对象
     */
    props: {
      model: {
        type: Object,
        required: true
      }
    },
    methods: {
      /**
       * 添加栏目
       * @since 1.0.2
       */
      addColumn () {
        this.$refs.columnSetting.show = true
      },
      /**
       * 设置栏目信息
       * @param {Object} model - 栏目信息
       */
      setColumn (model) {
        const fileName = model.fileName ? (model.fileName + '').trim() : ''
        let panes = []
        model.panes.forEach(pane => {
          panes.push({
            label: pane,
            childrens: []
          })
        })

        this.model.childrens.push({
          title: model.title,
          column: model.column,
          fileName: fileName,
          fields: [],
          fieldsConfig: `${hump(fileName)}Config`,
          pane: model.pane,
          panes: panes
        })
      }
    }
  }

  window.FormFieldRender = FormFieldRender
})(window)
