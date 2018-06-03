/*
 * @fileOverview: formTools弹出层组件
 * @author: xuzengqiang
 * @date: 2018-06-03 14:29:54
 */
(window => {
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

    const ToolDialog = {
        template: '#tool-dialog-template',
        name: 'ToolDialog',
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
             * 增加Tool按钮
             */
            addTool () {
                this.$emit('add-tool')
            }
        }
    }

    window.ToolDialog = ToolDialog
})(window)