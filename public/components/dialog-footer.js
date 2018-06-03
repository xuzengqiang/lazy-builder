/*
 * @fileOverview: 弹出层底部组件
 * @author: xuzengqiang
 * @date: 2018-06-03 12:18:39
 */
(window => {
    const DialogFooter = {
        template: '#dialog-footer-template',
        name: 'DialogFooter',
        methods: {
            cancel () {
                this.$emit('cancel')
            },
            ensure () {
                this.$emit('ensure')
            }
        }
    }

    window.DialogFooter = DialogFooter
})(window)