/*
 * @fileOverview: 表单字段处理
 * @author: xuzengqiang
 * @date: 2018-06-02 16:01:31
 */
; (window => {
    const isPositionNumber = number => /^(0|[1-9]\d*)$/.test(number)
    const isInt = number => /^[1-9]\d*$/.test(number)
    const hump = (string) => {
        return string.replace(/-([a-z])|(\d)/ig, (str, char, number) => {
            if (char) {
                return char.toUpperCase()
            } else if (number) {
                return String.fromCharCode(parseInt(number) + 97)
            }
        })
    }

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
                dialogVisible: false,
                status: 'setting',
                fields: [],
                title: '',
                focused: true,
                column: DEFAULT_COLUMN
            }
        },
        /**
         * 属性列表
         * @property {Boolean} hasTitle - 父栏目是否存在标题
         * @property {Object} model - 模块对象
         */
        props: {
            hasTitle: Boolean,
            model: {
                type: Object,
                required: true
            }
        },
        computed: {
            rowFields () {
                let rows = []
                let sum = 0
                let arr = []
                let totalspan = DEFAULT_MAX_SPAN
                // 默认一列所占的span数
                let span = totalspan / this.model.column

                this.model.fields.forEach((field, index) => {
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
                this.model.fields.push(field)
            },
            /**
             * 栏目点击事件
             * @description 如果是设置状态,那么则弹出设置层
             */
            columnClicked () {
                if (!this.model.created) {
                    this.$refs.columnConfigDialog.show = true
                }
            },
            /**
             * 设置栏目信息
             * @param {Object} model - 栏目信息
             */
            setColumn (model) {
                const fileName = model.fileName ? (model.fileName + '').trim() : ''
                this.model.title = model.title
                this.model.column = model.column
                this.model.fileName = fileName
                // @fixed 如果已经构建,加上标识
                this.model.created = true
                this.model.fieldsConfig = `${hump(fileName)}Config`
                this.status = 'editor'
            },
            /**
             * 删除字段信息
             * @param {Object} field - 字段信息
             */
            deleteField (field) {
                const index = field.index
                this.$confirm('删除的字段信息无法恢复,确认删除吗?', '温馨提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(data => {
                    try {
                        this.model.fields.splice(index, 1)
                        this.$message.success('删除成功!')
                    } catch (e) {
                        this.$message.error(`删除失败:${e}`)
                    }
                })
            }
        }
    }

    window.FormFieldRender = FormFieldRender
})(window)
