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
            type: 'input',
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
     * resizes
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
        watch: {
            show (value) {
                value && (this.model = ModelConfig())
            }
        },
        methods: {
            /**
             * 新增字段
             */
            addField () {
                this.show = false
                this.$emit('add-field', JSON.parse(JSON.stringify(this.model)))
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
