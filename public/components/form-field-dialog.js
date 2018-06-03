/*
 * @fileOverview: 表单字段处理
 * @author: xuzengqiang
 * @date: 2018-06-02 16:01:31
 */
(window => {
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
            column: 1
        }
    }

    const FormFieldDialog = {
        template: '#form-field-dialog-template',
        name: 'FormFieldDialog',
        data () {
            return {
                model: ModelConfig(),
                show: false,
                yesOrNo: [{
                    label: '是',
                    value: true
                }, {
                    label: '否',
                    value: false
                }],
                fieldTypes: [
                    'input',
                    'number',
                    'textarea',
                    'select',
                    'datePicker',
                    'autocomplete',
                    'area'
                ]
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
            }
        }
    }

    window.FormFieldDialog = FormFieldDialog
})(window)
