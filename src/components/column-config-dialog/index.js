/*
 * @fileOverview: 子栏目配置
 * @author: xuzengqiang
 * @date: 2018-06-04 16:45:59
 */
(window => {
    const ModelConfig = () => {
        return {
            title: '',
            column: 6
        }
    }
    const ColumnConfigDialog = {
        template: '#column-config-dialog-template',
        name: 'ColumnConfigDialog',
        data () {
            return {
                model: ModelConfig(),
                show: false
            }
        },
        /**
         * 属性列表
         * @property {Boolean} hasTitle - 父栏目是否存在标题
         */
        props: {
            hasTitle: Boolean
        },
        watch: {
            show (value) {
                console.error('hello kitty')
                value && (this.model = ModelConfig())
            }
        },
        methods: {
            setColumn () {
                this.show = false
                this.$emit('set-column', this.model)
            }
        }
    }

    window.ColumnConfigDialog = ColumnConfigDialog
})(window)