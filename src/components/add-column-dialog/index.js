/*
 * @fileOverview: 栏目新增
 * @author: xuzengqiang
 * @date: 2018-06-02 17:49:18
 */
;(window => {
    const AddColumnDialog = {
        template: '#add-column-dialog-template',
        name: 'AddColumnDialog',
        data() {
            return {
                model: {
                    title: '',
                    layout: ''
                },
                layout: 'one-column',
                show: false
            }
        },
        methods: {
            addColumn() {
                this.$emit('add-column')
            }
        }
    }

    window.AddColumnDialog = AddColumnDialog
})(window)
