/**
 * @copyright (c) 2018, www.wicoder.net. All rights reserved.
 * @fileOverview 项目前端入口文件
 * @author xuzengqiang <253948113@qq.com>
 * @date 2018-05-30 12:10:20
 * @version 1.0.0
 */
dom.ready(() => {
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

    new Vue({
        el: '#app',
        delimiters: ['${', '}'],
        data () {
            return {
                build: '开始构建',
                currentModule: 'form',
                module: {
                    author: '',
                    router: '',
                    name: ''
                },
                formToolList: [{
                    label: '刷新',
                    icon: 'refresh',
                    func: () => vm.reload
                }, {
                    label: '新增',
                    icon: 'plus'
                }, {
                    label: '删除',
                    icon: 'delete'
                }, {
                    label: '审核',
                    icon: 'shenhe'
                }, {
                    label: '反审',
                    icon: 'shenhe'
                }, {
                    label: '通用查询',
                    key: 'custom-filter',
                    icon: 'search'
                }, {
                    label: '个性设置',
                    icon: 'custom'
                }],
                formToolModel: {
                    label: '',
                    value: ''
                },
                yesOrNo: [{
                    label: '是',
                    value: 'yes'
                }, {
                    label: '否',
                    value: 'no'
                }],
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
                fieldTypes: [
                    'input',
                    'number',
                    'textarea',
                    'select',
                    'datePicker',
                    'autocomplete',
                    'area'
                ],
                columns: [
                    {
                        main: {
                            totalspan: 24,
                            column: 6,
                            title: '录入信息',
                            fields: [{
                                label: '融资编码',
                                disabled: true,
                                key: 'financingNumber'
                            }, {
                                label: '借款总额',
                                key: 'borrowAmount'
                            }, {
                                label: '实际借款',
                                slot: 'actualLoanAmount'
                            }, {
                                label: '到账借款',
                                disabled: true,
                                key: 'payLoanAmount'
                            }, {
                                label: '未到账借款',
                                slot: 'unpayLoanAmount'
                            }, {
                                label: '年利率',
                                slot: 'annualRate'
                            }, {
                                label: '融资类型',
                                type: 'select',
                                lookupCode: 'fms_financing_type',
                                key: 'financingType'
                            }]
                        }
                        // leftcontent:
                        // rightcontent:
                    }, {
                        main: {
                            totalspan: 12,
                            column: 2,
                            title: '录入信息',
                            fields: [{
                                label: '融资编码',
                                disabled: true,
                                key: 'financingNumber'
                            }, {
                                label: '借款总额',
                                key: 'borrowAmount'
                            }, {
                                label: '实际借款',
                                slot: 'actualLoanAmount'
                            }, {
                                label: '到账借款',
                                disabled: true,
                                key: 'payLoanAmount'
                            }, {
                                label: '未到账借款',
                                slot: 'unpayLoanAmount'
                            }, {
                                label: '年利率',
                                slot: 'annualRate'
                            }, {
                                label: '融资类型',
                                type: 'select',
                                lookupCode: 'fms_financing_type',
                                key: 'financingType'
                            }]
                        },
                        leftcontent: {
                            totalspan: 12,
                            column: 2,
                            title: '录入信息',
                            fields: [{
                                label: '融资编码',
                                disabled: true,
                                key: 'financingNumber'
                            }, {
                                label: '借款总额',
                                key: 'borrowAmount'
                            }, {
                                label: '实际借款',
                                slot: 'actualLoanAmount'
                            }, {
                                label: '到账借款',
                                disabled: true,
                                key: 'payLoanAmount'
                            }, {
                                label: '未到账借款',
                                slot: 'unpayLoanAmount'
                            }, {
                                label: '年利率',
                                slot: 'annualRate'
                            }, {
                                label: '融资类型',
                                type: 'select',
                                lookupCode: 'fms_financing_type',
                                key: 'financingType'
                            }]
                        }
                        // rightcontent:
                    }, {
                        main: {
                            totalspan: 12,
                            column: 4,
                            title: '录入信息',
                            fields: [{
                                label: '融资编码',
                                disabled: true,
                                key: 'financingNumber'
                            }, {
                                label: '借款总额',
                                key: 'borrowAmount'
                            }, {
                                label: '实际借款',
                                slot: 'actualLoanAmount'
                            }, {
                                label: '到账借款',
                                disabled: true,
                                key: 'payLoanAmount'
                            }, {
                                label: '未到账借款',
                                slot: 'unpayLoanAmount'
                            }, {
                                label: '年利率',
                                slot: 'annualRate'
                            }, {
                                label: '融资类型',
                                type: 'select',
                                lookupCode: 'fms_financing_type',
                                key: 'financingType'
                            }]
                        },
                        leftcontent: {
                            totalspan: 8,
                            column: 2,
                            title: '录入信息',
                            fields: [{
                                label: '融资编码',
                                disabled: true,
                                key: 'financingNumber'
                            }, {
                                label: '借款总额',
                                key: 'borrowAmount'
                            }, {
                                label: '实际借款',
                                slot: 'actualLoanAmount'
                            }, {
                                label: '到账借款',
                                disabled: true,
                                key: 'payLoanAmount'
                            }, {
                                label: '未到账借款',
                                slot: 'unpayLoanAmount'
                            }, {
                                label: '年利率',
                                slot: 'annualRate'
                            }, {
                                label: '融资类型',
                                type: 'select',
                                lookupCode: 'fms_financing_type',
                                key: 'financingType'
                            }]
                        },
                        rightcontent: {
                            column: 1,
                            totalspan: 4,
                            title: '录入信息',
                            fields: [{
                                label: '融资编码',
                                disabled: true,
                                key: 'financingNumber'
                            }, {
                                label: '借款总额',
                                key: 'borrowAmount'
                            }, {
                                label: '实际借款',
                                slot: 'actualLoanAmount'
                            }, {
                                label: '到账借款',
                                disabled: true,
                                key: 'payLoanAmount'
                            }, {
                                label: '未到账借款',
                                slot: 'unpayLoanAmount'
                            }, {
                                label: '年利率',
                                slot: 'annualRate'
                            }, {
                                label: '融资类型',
                                type: 'select',
                                lookupCode: 'fms_financing_type',
                                key: 'financingType'
                            }]
                        }
                    }
                ]
            }
        },
        methods: {
            transport () {
                axios({
                    method: 'POST',
                    baseURL: 'http://localhost:3000',
                    url: '/builder'
                }).then(data => {
                    console.error(data)
                }).catch(error => {
                    console.error(error)
                })
            },
            handleClose (tag) {
                this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
            },

            showInput () {
                this.inputVisible = true;
                this.$nextTick(_ => {
                    this.$refs.saveTagInput.$refs.input.focus();
                });
            },

            handleInputConfirm () {
                let inputValue = this.inputValue;
                if (inputValue) {
                    this.dynamicTags.push(inputValue);
                }
                this.inputVisible = false;
                this.inputValue = '';
            },

            addFormTool () {
                this.dialogVisible = false
                this.formToolList.push({
                    label: this.formToolModel.label,
                    icon: this.formToolModel.icon
                })
            },

            addTool () {
                this.toolDialogVisible = false
                this.toolList.push({
                    label: this.toolModel.label,
                    icon: this.toolModel.icon
                })
            },

            addColumn () {

            },

            getRowFields ({ fields, totalspan = 24, column = 4 }) {
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

            addField () {
                console.error(this.columns[0].main.fields)
                this.columns[0].main.fields.push({
                    label: '添加字段1',
                    key: 'hellokitty',
                    column: 3
                })
            }
        }
    })
})
