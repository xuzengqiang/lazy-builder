/*
 * @fileOverview: 模块配置组件
 * @author: xuzengqiang
 * @date: 2018-06-03 14:09:19
 */
(window => {
    const MenuConfig = {
        template: '#menu-config-template',
        name: 'MenuConfig',
        data () {
            return {
                model: {
                    author: '',
                    router: '',
                    name: ''
                }
            }
        },
        methods: {
            /**
             * 转化为json数据
             * @description 用于提交表单数据
             */
            toJSON () {
                return this.model
            }
        }
    }

    window.MenuConfig = MenuConfig
})(window)