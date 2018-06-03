/*
 * @fileOverview: formTools弹出层组件
 * @author: xuzengqiang
 * @date: 2018-06-03 14:29:54
 */
; (window => {
    const icons = [
        'voice',
        'novoice',
        'next',
        'previous',
        'unie038',
        'remind',
        'xiangzuo4',
        'xiangyou4'
    ]

    const FormToolDialog = {
        template: '#form-tool-dialog-template',
        name: 'FormToolDialog',
        data () {
            return {
                model: {
                    name: '',
                    icon: ''
                },
                icons,
                show: false
            }
        },
        methods: {
            /**
             * 增加FormTool按钮
             */
            addFormTool () {
                this.$emit('add-form-tool')
            }
        }
    }

    window.FormToolDialog = FormToolDialog
})(window)
