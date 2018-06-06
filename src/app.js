/**
 * @copyright (c) 2018, www.wicoder.net. All rights reserved.
 * @fileOverview 项目前端入口文件
 * @author xuzengqiang <253948113@qq.com>
 * @date 2018-05-30 12:10:20
 * @version 1.0.0
 */
dom.ready(() => {
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

  new Vue({
    el: '#app',
    delimiters: ['${', '}'],
    data () {
      return {
        currentModule: 'index',
        /**
         * 菜单配置
         * @property {String} router - 菜单路由
         * @property {String} name - 菜单名称
         */
        menu: {
          router: '',
          name: ''
        },
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
        yesOrNo: yesOrNo,
        addModifyModel: {
          columns: []
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
    mounted () {
      window.__LAZY_BUILDER__ = this
    },
    mixins: [CacheEngine],
    methods: {
      /**
       * 重置所有数据
       */
      resetData () {
        this.$confirm('数据重置后无法恢复,确定重置吗?', '温馨提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(data => {
          Object.assign(this.$data, this.$options.data.apply(this))
        })
      },

      /**
       * 开始构建
       */
      builder () {
        let params = {
          menu: this.menu,
          /** 首页配置 */
          indexModel: this.indexModel,
          /** 新增修改页配置 */
          addModifyModel: this.addModifyModel
        }

        axios
          .post('http://localhost:3000/builder', params)
          .then(data => {
            console.error(data)
          })
          .catch(error => {
            console.error(error)
          })
      },

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
       * 新增栏目
       * @date 2018-06-04 15:59:18
       * @since 1.0.0
       */
      addColumn (column) {
        this.addModifyModel.columns.push(column)
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
       * 栏目点击事件处理
       * @param {Object} column - 栏目信息
       */
      columnClicked (column) {
        console.error(column)
      },

      /**
       * 删除当前栏目
       * @param {Object} column - 栏目信息
       * @param {Integer} index - 当前栏目的索引
       */
      deleteColumn (column, index) {
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
      editColumn (column, index) {
        this.$refs.columnDialog.show = true
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
      }
    }
  })
})
