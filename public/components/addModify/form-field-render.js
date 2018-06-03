/*
 * @fileOverview: 表单字段处理
 * @author: xuzengqiang
 * @date: 2018-06-02 16:01:31
 */
(window => {
    const isPositionNumber = number => /^(0|[1-9]\d*)$/.test(number)
    const isInt = number => /^[1-9]\d*$/.test(number)

    /**
     * 最大列数
     */
    const DEFAULT_MAX_SPAN = 24
    const DEFAULT_COLUMN = 4

    const FormFieldRender = {
        template: '#form-field-render-template',
        name: 'FormFieldRender',
        data () {
            return {
                dialogVisible: false
            }
        },
        props: {
            title: String,
            fields: {
                type: Array,
                default: () => []
            },
            column: {
                type: Number,
                default: DEFAULT_COLUMN,
                validator (value) {
                    return isInt(value) && parseInt(value) % 2 === 0
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

                this.fields.forEach(field => {
                    field.span = Math.min(totalspan, (/^[1-9]\d*$/.test(field.column) ? parseInt(field.column) : 1) * span)
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

                return rows
            }
        },
        methods: {
            /**
             * 添加字段
             */
            addField () {
                this.$refs.dialog.show = true
            },
            /**
             * 弹窗关闭之后的处理
             * @param {Object} field - 字段信息
             */
            addFieldHandle (field) {
                this.fields.push(field)
            }
        }
    }

    window.FormFieldRender = FormFieldRender
})(window)
