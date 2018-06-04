/**
 * @copyright (c) 2018, www.wicoder.net. All rights reserved.
 * @fileOverview 项目前端入口文件
 * @author xuzengqiang <253948113@qq.com>
 * @date 2018-05-30 12:10:20
 * @version 1.0.0
 */
dom.ready(() => {
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

    new Vue({
        el: '#app',
        delimiters: ['${', '}'],
        data () {
            return {
                currentModule: 'index',
                /**
                 * 模块配置
                 * @property {String} author - 作者名称
                 * @property {String} router - 菜单路由
                 * @property {String} name - 菜单名称
                 */
                module: {
                    author: '',
                    router: '',
                    name: ''
                },
                /**
                 * 首页参数配置
                 */
                indexModel: {
                    /**
                     * 首页参数配置
                     * @property {Boolean} hasDialog - 是否有弹窗
                     * @property {Boolean} hasSelection - 是否生成复选框
                     * @property {Boolean} hasEdit - 是否生成编辑操作
                     * @property {String} method - 请求方法名称
                     * @property {String} searchCode - 通用查询code
                     * @property {String} customColumnCode - 自定义列code
                     * @property {String} customSearchCode - 自定义查询code
                     */
                    option: {
                        hasDialog: true,
                        hasSelection: false,
                        hasEdit: true,
                        method: '',
                        searchCode: '',
                        customColumnCode: '',
                        customSearchCode: ''
                    },

                    /**
                     * formTool集合
                     */
                    formToolList: [
                        {
                            label: '刷新',
                            icon: 'refresh',
                            key: 'refresh'
                        },
                        {
                            label: '通用查询',
                            icon: 'search',
                            key: 'custom-filter'
                        },
                        {
                            label: '个性设置',
                            icon: 'custom',
                            key: 'query-table'
                        }
                    ],

                    /**
                     * 操作按钮集合
                     */
                    toolList: []
                },

                formToolModel: {
                    label: '',
                    value: ''
                },
                yesOrNo: yesOrNo,
                inputVisible: false,
                inputValue: '',
                dialogVisible: false,
                icons: icons,
                toolDialogVisible: false,
                columnDialogVisible: false,
                toolModel: {
                    label: '1212',
                    icon: ''
                },
                fieldDialogVisible: false,
                fieldTypes: ['input', 'number', 'textarea', 'select', 'datePicker', 'autocomplete', 'area'],
                columns: [
                    {
                        main: {
                            totalspan: 24,
                            column: 6,
                            title: '录入信息',
                            fields: [
                                {
                                    label: '融资编码',
                                    disabled: true,
                                    key: 'financingNumber'
                                },
                                {
                                    label: '借款总额',
                                    key: 'borrowAmount'
                                },
                                {
                                    label: '实际借款',
                                    slot: 'actualLoanAmount'
                                },
                                {
                                    label: '到账借款',
                                    disabled: true,
                                    key: 'payLoanAmount'
                                },
                                {
                                    label: '未到账借款',
                                    slot: 'unpayLoanAmount'
                                },
                                {
                                    label: '年利率',
                                    slot: 'annualRate'
                                },
                                {
                                    label: '融资类型',
                                    type: 'select',
                                    lookupCode: 'fms_financing_type',
                                    key: 'financingType'
                                }
                            ]
                        }
                        // leftcontent:
                        // rightcontent:
                    }
                ]
            }
        },
        methods: {
            /**
             * 开始构建
             */
            builder () {
                let params = {
                    menu: this.$refs.menu.toJSON(),
                    /** 首页配置 */
                    indexModel: this.indexModel,
                    /** 新增修改页配置 */
                    addModify: {}
                }

                axios
                    .post('http://localhost:3000/builder', params)
                    .then(data => {
                        console.error(data)
                    })
                    .catch(error => {
                        console.error(error)
                    })
            },

            /**
             * 新增FormTool
             * @author xuzengqiang
             * @date 2018-6-4 00:23:57
             * @param {Object} model - formTool信息
             */
            addFormTool (model) {
                let formTool = JSON.parse(JSON.stringify(model))
                this.indexModel.formToolList.push(formTool)
            },

            /**
             * 移除formTool
             * @date 2018-6-4 00:36:25
             * @since 1.0.0
             * @param {Number} index - 索引
             */
            removeFormTool (index) {
                this.indexModel.formToolList.splice(index, 1)
            },

            /**
             * 增加tool按钮
             * @date 2018-6-4 00:36:41
             * @since 1.0.0
             * @param {Object} model - formTool信息
             */
            addTool (model) {
                let tool = JSON.parse(JSON.stringify(model))
                this.indexModel.toolList.push(tool)
            },

            /**
             * 移除tool
             * @date 2018-6-4 00:36:25
             * @since 1.0.0
             * @param {Number} index - 索引
             */
            removeTool (index) {
                this.indexModel.toolList.splice(index, 1)
            },

            showAddColumnDialog () {
                console.error('show column')
                console.error(this.$refs.columnDialog)
                this.$refs.columnDialog.show = true
            }
        }
    })
})
