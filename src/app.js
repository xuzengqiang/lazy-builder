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
        data() {
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
                 * @property {Boolean} hasDialog - 是否有弹窗,
                 * @property {String} method - 请求方法名称
                 * @property {String} searchCode - 通用查询code
                 * @property {String} customColumnCode - 自定义列code
                 * @property {String} customSearchCode - 自定义查询code
                 */
                indexModel: {
                    option: {
                        hasDialog: true,
                        method: '',
                        searchCode: '',
                        customColumnCode: '',
                        customSearchCode: ''
                    }
                },

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
                formToolModel: {
                    label: '',
                    value: ''
                },
                yesOrNo: yesOrNo,
                inputVisible: false,
                inputValue: '',
                dialogVisible: false,
                icons: icons,
                toolList: [],
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
        mounted() {
            console.error(this.$refs.menu)
            console.error(this.$refs.formToolDialog)
        },
        methods: {
            /**
             * 开始构建
             */
            builder() {
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
             * 获取首页配置的JSON数据
             * @author xuzengqiang
             * @date 2018-6-3 21:08:26
             * @since 1.0.0
             */
            getIndexConfig() {
                return {
                    tools: [],
                    formTools: [],
                    option: {
                        hasComponent: true,
                        method: '',
                        searchCode: '',
                        customColumnCode: '',
                        customSearchCode: ''
                    }
                }
            },

            handleClose(tag) {
                this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1)
            },

            showInput() {
                this.inputVisible = true
                this.$nextTick(_ => {
                    this.$refs.saveTagInput.$refs.input.focus()
                })
            },

            handleInputConfirm() {
                let inputValue = this.inputValue
                if (inputValue) {
                    this.dynamicTags.push(inputValue)
                }
                this.inputVisible = false
                this.inputValue = ''
            },

            addFormTool() {
                this.dialogVisible = false
                this.formToolList.push({
                    label: this.formToolModel.label,
                    icon: this.formToolModel.icon
                })
            },

            addTool() {
                this.toolDialogVisible = false
                this.toolList.push({
                    label: this.toolModel.label,
                    icon: this.toolModel.icon
                })
            },

            addColumn() {},

            getRowFields({ fields, totalspan = 24, column = 4 }) {
                let rows = []
                let sum = 0
                let arr = []
                // 默认一列所占的span数
                totalspan = 24
                let span = totalspan / column

                fields.forEach(field => {
                    field.span = Math.min(totalspan, (/^[1-9]\d*$/.test(field.column) ? parseInt(field.column) : 1) * span)
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
            },

            showAddColumnDialog() {
                console.error('show column')
                console.error(this.$refs.columnDialog)
                this.$refs.columnDialog.show = true
            }
        }
    })
})
