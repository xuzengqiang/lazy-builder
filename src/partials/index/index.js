/**
 * @fileOverview 首页功能拆分
 * @author xuzengqiang
 * @date 2018-6-7 23:53:38
 * @version 1.0.0
 */
; (window => {
  const rint = /^(0|[1-9]\d*)$/i

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

  const IndexMixin = {
    data () {
      return {
        yesOrNo,
        /**
         * 首页参数配置
         */
        indexModel: {
          /**
           * 首页参数配置
           * @property {Boolean} hasDialog - 是否有弹窗
           * @property {Boolean} hasSelection - 是否生成复选框
           * @property {Boolean} hasEdit - 是否生成编辑操作
           * @property {String} method - 请求方法名称
           * @property {String} searchCode - 通用查询code
           * @property {String} customColumnCode - 自定义列code
           * @property {String} customSearchCode - 自定义查询code
           */
          option: {
            hasDialog: true,
            hasSelection: false,
            hasEdit: true,
            method: '',
            searchCode: '',
            customColumnCode: '',
            customSearchCode: ''
          },

          /**
           * formTool集合
           */
          formToolList: [
            {
              label: '刷新',
              icon: 'refresh',
              refresh: true
            },
            {
              label: '通用查询',
              icon: 'search',
              customFilter: true
            },
            {
              label: '个性设置',
              icon: 'custom',
              queryTable: true
            }
          ],

          /**
           * 操作按钮集合
           */
          toolList: []
        },
        /**
         * 选中FormTool的index
         */
        selectedFormToolIndex: 0,
        /**
         * 选中tool的index
         */
        selectedToolIndex: 0
      }
    },
    methods: {
      /**
       * 新增FormTool
       * @author xuzengqiang
       * @date 2018-6-4 00:23:57
       * @param {Object} model - formTool信息
       */
      addFormTool (model) {
        let formTool = JSON.parse(JSON.stringify(model))
        this.indexModel.formToolList.push(formTool)
      },

      /**
       * 移除formTool
       * @date 2018-6-4 00:36:25
       * @since 1.0.0
       * @param {Number} index - 索引
       */
      removeFormTool (index) {
        this.indexModel.formToolList.splice(index, 1)
      },

      /**
       * 增加tool按钮
       * @date 2018-6-4 00:36:41
       * @since 1.0.0
       * @param {Object} model - formTool信息
       */
      addTool (model) {
        let tool = JSON.parse(JSON.stringify(model))
        this.indexModel.toolList.push(tool)
      },

      /**
       * 移除tool
       * @date 2018-6-4 00:36:25
       * @since 1.0.0
       * @param {Number} index - 索引
       */
      removeTool (index) {
        this.indexModel.toolList.splice(index, 1)
      },

      /**
       * formTool点击之后的处理
       * @param {Number} index - 点击的formTool的索引
       */
      formToolClicked (index) {
        this.selectedFormToolIndex = index
      },

      /**
       * formTool左移
       */
      formToolMoveLeft () {
        const index = this.selectedFormToolIndex
        this.swap(this.indexModel.formToolList, index, index - 1, () => {
          this.selectedFormToolIndex = index - 1
        })
      },

      /**
       * formTool右移
       */
      formToolMoveRight () {
        const index = this.selectedFormToolIndex
        this.swap(this.indexModel.formToolList, index, index + 1, () => {
          this.selectedFormToolIndex = index + 1
        })
      },

      /**
       * tool点击之后的处理
       * @param {Number} index - 点击的formTool的索引
       */
      toolClicked (index) {
        this.selectedToolIndex = index
      },

      /**
       * tool左移
       */
      toolMoveLeft () {
        const index = this.selectedToolIndex
        this.swap(this.indexModel.toolList, index, index - 1, () => {
          this.selectedToolIndex = index - 1
        })
      },

      /**
       * tool右移
       */
      toolMoveRight () {
        const index = this.selectedToolIndex
        this.swap(this.indexModel.toolList, index, index + 1, () => {
          this.selectedToolIndex = index + 1
        })
      },

      /**
       * 交换数组中两个值
       * @param {Array} array - 需要操作的数组
       * @param {Integer} indexa - 索引a
       * @param {Integer} indexb - 索引b
       * @param {Function} callback - 交换成功的function
       */
      swap (array, indexa, indexb, callback) {
        if (Array.isArray(array) && array.length >= 2 && rint.test(indexa) && rint.test(indexb)) {
          if (indexa < array.length && indexb < array.length) {
            let temp = array[indexa]
            this.$set(array, indexa, array[indexb])
            this.$set(array, indexb, temp)
            if (typeof callback === 'function') {
              callback()
            }
          }
        }
      },

      /**
       * 首页完整构建
       * @description
       * 会构建出首页代码
       * @since 1.0.0
       */
      indexBuilder () {
        this.$confirm('确定单独构建首页代码吗?', '温馨提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(data => {
          axios
            .post('http://localhost:3000/index-builder', {
              menu: this.menu,
              /** 首页配置 */
              indexModel: this.indexModel
            })
            .then(data => {
              console.error(data)
            })
            .catch(error => {
              console.error(error)
            })
        })
      },

      /**
       * 首页单文件构建
       * @since 1.0.1
       */
      indexUnifileBuilder () {
        this.$confirm('确定生成首页单文件代码吗?', '温馨提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(data => {
          axios
            .post('http://localhost:3000/index-unifile-builder', {
              menu: this.menu,
              /** 首页配置 */
              indexModel: this.indexModel
            })
            .then(data => {
              console.error(data)
            })
            .catch(error => {
              console.error(error)
            })
        })
      }
    }
  }

  window.IndexMixin = IndexMixin
})(window)
