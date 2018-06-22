/*
 * @fileOverview: 添加字段栏目
 * @author: xuzengqiang
 * @date: 2018-06-15 14:55:20
 */
; (window => {
  const DEFAULT_COLUMN = 4
  const DEFAULT_MAX_SPAN = 24
  const isInt = number => /^[1-9]\d*$/.test(number)

  /**
   * 操作模式
   * @enum
   * @property {String} ADD - 新增
   * @property {String} EDIT - 修改
   * @since 1.0.1
   */
  const Mode = {
    ADD: 'add',
    EDIT: 'edit'
  }

  const FieldColumnComponent = {
    template: '#field-column-template',
    name: 'FieldColumn',
    data () {
      return {
        dialogVisible: false,
        dialogData: null,
        mode: Mode.ADD
      }
    },
    /**
     * 属性列表
     * @property {Array} fields - 字段列表
     * @property {String|Number} column - 列数
     */
    props: {
      fields: {
        type: Array,
        required: true
      },
      column: {
        type: [String, Number],
        default: DEFAULT_COLUMN,
        validator (value) {
          return isInt(value) && (parseInt(value) === 1 || parseInt(value) % 2 === 0)
        }
      }
    },
    computed: {
      rowFields () {
        let rows = []
        let sum = 0
        let arr = []
        let totalspan = DEFAULT_MAX_SPAN
        // 默认一列所占的span数
        let span = totalspan / this.column

        this.fields.forEach((field, index) => {
          field.span = Math.min(totalspan, (/^[1-9]\d*$/.test(field.column) ? parseInt(field.column) : 1) * span)
          field.index = index
          if (sum + field.span < totalspan) {
            arr.push(field)
            sum += field.span
          } else if (sum + field.span === totalspan) {
            arr.push(field)
            rows.push(arr)
            sum = 0
            arr = []
          } else {
            rows.push(arr)
            arr = []
            arr.push(field)
            sum = field.span
          }
        })

        if (arr.length) {
          rows.push(arr)
        }
        console.error('重绘rows')
        console.error(rows)
        return rows
      }
    },
    methods: {
      /**
       * 添加字段
       */
      addField () {
        this.dialogData = null
        this.mode = Mode.ADD
        this.$refs.dialog.show = true
      },
      /**
       * 弹窗关闭之后的处理
       * @param {Object} field - 字段信息
       */
      addFieldHandle (field) {
        console.error('add Fields')
        this.fields.push(field)
      },
      /**
       * 删除字段信息
       * @param {Object} field - 字段信息
       * @since 1.0.1
       */
      deleteField (field) {
        const index = field.index
        this.$confirm('删除的字段信息无法恢复,确认删除吗?', '温馨提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(data => {
          try {
            this.fields.splice(index, 1)
            this.$message.success('删除成功!')
          } catch (e) {
            this.$message.error(`删除失败:${e}`)
          }
        })
      },
      /**
       * 字段编辑
       * @param {Object} field - 字段信息
       * @since 1.0.1
       */
      editField (field) {
        this.dialogData = field
        this.mode = Mode.EDIT
        this.$refs.dialog.show = true
      },
      /**
       * 更新字段信息
       * @param {Object} field - 字段信息
       * @since 1.0.1
       */
      editFieldHandle (field) {
        console.error(field, field.index)
        this.$set(this.fields, field.index, field)
      }
    }
  }

  window.FieldColumnComponent = FieldColumnComponent
})(window)
