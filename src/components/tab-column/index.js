/*
 * @fileOverview: 选项卡栏目配置
 * @author: xuzengqiang
 * @date: 2018-06-15 16:32:27
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

  const TabColumnComponent = {
    template: '#tab-column-template',
    name: 'TabColumn',
    data () {
      return {}
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
       * @description
       * 暂时不考虑选项卡下面还有选项卡的情况
       */
      setColumn (model) {
        const fileName = model.fileName ? (model.fileName + '').trim() : ''

        this.model.childrens.push({
          title: model.title,
          column: model.column,
          fileName: fileName,
          fields: [],
          fieldsConfig: `${hump(fileName)}Config`
        })
      }
    }
  }

  window.TabColumnComponent = TabColumnComponent
})(window)

