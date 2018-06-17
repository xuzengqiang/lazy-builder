/*
 * @fileOverview: 表单字段处理
 * @author: xuzengqiang
 * @date: 2018-06-02 16:01:31
 */
; (window => {
  const DEFAULT_COLUMN = 4
  const isPositionNumber = number => /^(0|[1-9]\d*)$/.test(number)
  const isInt = number => /^[1-9]\d*$/.test(number)

  const ModelConfig = () => {
    return {
      label: '',
      key: '',
      disabled: false,
      type: 'text',
      lookupCode: '',
      column: 1,
      dateType: 'datetime',
      valueFormat: 'yyyy-MM-dd HH:mm:ss',
      filter: '',
      rows: 1,
      resize: 'none',
      slot: false
    }
  }

  /**
   * 排除掉
   * year
   * week
   * dates
   * datetimerange
   * daterange
   */
  const dateTypes = [
    // 'year',
    'month',
    'date',
    // 'dates',
    // 'week',
    // 'datetimerange',
    // 'daterange',
    'datetime'
  ]

  /**
   * textarea缩放类型
   * @array
   * @property none - 不允许缩放
   * @property both - 允许水平垂直方向缩放
   * @property horizontal - 允许水平方向缩放
   * @property vertical - 允许垂直方向缩放
   */
  const resizes = [
    'none',
    'both',
    'horizontal',
    'vertical'
  ]

  const dateTypeFormateMapper = {
    // year: 'yyyy',
    month: 'yyyy-MM',
    date: 'yyyy-MM-dd',
    datetime: 'yyyy-MM-dd HH:mm:ss'
  }

  const dateFilterMapper = {
    // yyyy: '',
    month: 'month',
    date: 'date',
    datetime: 'time'
  }

  const fieldTypes = [{
    value: 'text',
    disabeld: false
  }, {
    value: 'textarea',
    disabeld: false
  }, {
    value: 'select',
    disabeld: false
  }, {
    value: 'datePicker',
    disabeld: false
  }, {
    value: 'number',
    disabled: true
  }, {
    value: 'searchTips',
    disabled: true
  }, {
    value: 'area',
    disabled: true
  }]

  const filters = [
    'lookup',
    'date',
    'month',
    'time',
    'minute',
    'second',
    'money',
    'thousands',
  ]

  /**
   * 操作模式
   * @enum
   * @property {String} ADD - 新增
   * @property {String} EDIT - 修改
   * @since 1.0.0
   */
  const Mode = {
    ADD: 'add',
    EDIT: 'edit'
  }

  const AddFieldDialog = {
    template: '#add-field-dialog-template',
    name: 'AddFieldDialog',
    data () {
      return {
        model: ModelConfig(),
        show: false,
        yesOrNo: [
          {
            label: '是',
            value: true
          },
          {
            label: '否',
            value: false
          }
        ],
        fieldTypes,
        dateTypes,
        filters,
        resizes
      }
    },
    /**
     * 属性列表
     * @property {Object} dialogData - 弹出层数据信息
     * @property {String} mode - 弹出层模式,默认为新增模式
     */
    props: {
      dialogData: {},
      mode: {
        type: String,
        default: Mode.ADD,
        validator: (value) => {
          return value === Mode.ADD || value === Mode.EDIT
        }
      }
    },
    watch: {
      /**
       * 当显示状态发生改变的时候修改model
       * @param {Object} value
       */
      show (value) {
        if (!value) return
        if (Mode.EDIT === this.mode) {
          this.model = JSON.parse(JSON.stringify(this.dialogData))
        } else {
          this.model = ModelConfig()
        }
      }
    },
    methods: {
      /**
       * 字段处理
       */
      fieldHandle () {
        this.show = false
        const model = JSON.parse(JSON.stringify(this.model))
        if (this.mode === Mode.ADD) {
          this.$emit('add-field', model)
        } else {
          this.$emit('edit-field', model)
        }
      },
      /**
       * 表单字段更新
       * @property {String} fieldType - 字段类型
       */
      fieldTypeChange (fieldType) {
        switch (fieldType) {
          case 'select':
            this.model.filter = 'lookup'
            break
          case 'datePicker':
            this.model.filter = 'time'
        }
      },
      /**
       * 日期类型选中
       * @property {String} dateType - 日期类型
       */
      dateTypeChange (dateType) {
        this.model.valueFormat = dateTypeFormateMapper[dateType]
        this.model.filter = dateFilterMapper[dateType]
      }
    }
  }

  window.AddFieldDialog = AddFieldDialog
})(window)
