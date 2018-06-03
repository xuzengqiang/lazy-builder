/*
 * @fileOverview: formTools弹出层组件
 * @author: xuzengqiang
 * @date: 2018-06-03 14:29:54
 */
;(window => {
    const icons = ['voice', 'novoice', 'next', 'previous', 'unie038', 'remind', 'xiangzuo4', 'xiangyou4']

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

    /**
     * model配置
     * @property {String} name - 按钮名称
     * @property {String} icon - 按钮图标
     * @property {String} disabled - 是否禁用
     */
    const ModelConfig = () => {
        return {
            name: '',
            icon: '',
            disabled: false
        }
    }

    const FormToolDialog = {
        template: '#form-tool-dialog-template',
        name: 'FormToolDialog',
        data() {
            return {
                model: ModelConfig(),
                icons,
                show: false,
                yesOrNo
            }
        },
        watch: {
            show(value) {
                value && (this.model = ModelConfig())
            }
        },
        methods: {
            /**
             * 增加FormTool按钮
             */
            addFormTool() {
                this.show = false
                this.$emit('add-form-tool', this.model)
            }
        }
    }

    window.FormToolDialog = FormToolDialog
})(window)
