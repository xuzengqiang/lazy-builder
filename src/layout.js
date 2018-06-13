/**
 * 测试布局
 * @author xuzengqiang
 * @date 2018-06-13 20:20:08
 * @since 1.1.0
 * @description
 * 1、支持多列布局
 * 2、支持选项卡布局
 */

export default vm => {
    return [{
        cols: [{
            title: '录入信息',
            column: 2,
            span: 8,
            fields: [{
                label: '发票应付编码',
                type: 'text',
                disabled: true
            }, {
                label: '供应商类型',
                type: 'text',
                disabled: false
            }, {
                label: '应付公司',
                type: 'text',
                disabled: false,
                column: 2
            }, {
                label: '所在区域',
                type: 'text',
                disabled: true
            }, {
                label: '来源编码',
                type: 'text',
                disabled: true
            }, {
                label: '备注',
                column: 6,
                type: 'text',
                slot: 'remark'
            }]
        }, {
            title: '个性设置',
            span: 16,
            fields: [{
                label: '纳入月份',
                type: 'datePicker',
                dateType: 'month',
                valueFormat: 'yyyy-MM'
            }, {
                label: '应付分类',
                type: 'select',
                lookupCode: 'fms_base_payable_type'
            }]
        }]
    }, {
        title: '快件费用',
        cols: [{
            column: 6,
            fields: [{
                label: '假日派送说明',
                type: 'text',
                column: 2
            }, {
                label: '代理单号',
                type: 'text',
                disabled: true
            }, {
                label: '提货日期',
                type: 'text',
                disabled: true
            }, {
                label: '主跟单人',
                type: 'text',
                disabled: true
            }, {
                label: '协助跟单',
                type: 'text',
                disabled: true
            }, {
                label: '唯品会编码',
                type: 'text',
                disabled: false
            }]
        }]
    }, {
        title: '快件跟踪信息',
        cols: [{
            tabs: [{
                label: '快件跟踪',
                column: 6,
                fields: [{
                    label: '寄件日期',
                    type: 'datePicker',
                    dateType: 'date',
                    valueFormat: 'yyyy-MM-dd'
                }, {
                    label: '异常金额',
                    type: 'text'
                }, {
                    label: '异常月份',
                    type: 'datePicker',
                    dateType: 'month',
                    valueFormat: 'yyyy-MM'
                }, {
                    label: '录单人员',
                    disabled: true,
                    type: 'text'
                }, {
                    label: '录单时间',
                    disabled: true,
                    type: 'datePicker',
                    dateType: 'datetime',
                    valueFormat: 'yyyy-MM-dd HH:mm:ss'
                }, {
                    label: '税率',
                    type: 'text'
                }, {
                    label: '代收款',
                    type: 'text'
                }]
            }, {
                label: '快件跟踪',
                column: 6,
                fields: [{
                    label: '到票时间',
                    type: 'datePicker',
                    dateType: 'date',
                    valueFormat: 'yyyy-MM-dd'
                }, {
                    label: '发票金额',
                    type: 'text'
                }, {
                    label: '纳入月份',
                    type: 'datePicker',
                    dateType: 'month',
                    valueFormat: 'yyyy-MM'
                }, {
                    label: '审核人员',
                    disabled: true,
                    type: 'text'
                }, {
                    label: '审核时间',
                    disabled: true,
                    type: 'datePicker',
                    dateType: 'datetime',
                    valueFormat: 'yyyy-MM-dd HH:mm:ss'
                }, {
                    label: '税率',
                    type: 'text'
                }, {
                    label: '代收款',
                    type: 'text'
                }]
            }]
        }]
    }, {
        cols: [{
            title: '快件费用',
            column: 2,
            span: 8,
            fields: [{
                label: '应收运费',
                type: 'text',
                disabled: true
            }, {
                label: '有无收款',
                type: 'text',
                disabled: false
            }, {
                label: '现金运费',
                type: 'text',
                disabled: true
            }, {
                label: '收款人',
                type: 'text'
            }, {
                label: '有无审单',
                type: 'text',
                disabled: true
            }, {
                label: '财务审单人',
                type: 'text'
            }, {
                label: '是否转侧',
                type: 'text',
                disabled: true
            }, {
                label: '专车费用',
                type: 'text'
            }, {
                label: '派送费',
                type: 'text',
                disabled: true
            }, {
                label: '其他',
                type: 'text'
            }]
        }, {
            title: '快件跟踪信息',
            span: 16,
            column: 4,
            tabs: [{
                label: '快件跟踪',
                column: 6,
                fields: [{
                    label: '寄件日期',
                    type: 'datePicker',
                    dateType: 'date',
                    valueFormat: 'yyyy-MM-dd'
                }, {
                    label: '异常金额',
                    type: 'text'
                }, {
                    label: '异常月份',
                    type: 'datePicker',
                    dateType: 'month',
                    valueFormat: 'yyyy-MM'
                }, {
                    label: '录单人员',
                    disabled: true,
                    type: 'text'
                }, {
                    label: '录单时间',
                    disabled: true,
                    type: 'datePicker',
                    dateType: 'datetime',
                    valueFormat: 'yyyy-MM-dd HH:mm:ss'
                }, {
                    label: '税率',
                    type: 'text'
                }, {
                    label: '代收款',
                    type: 'text'
                }]
            }, {
                label: '快件跟踪',
                column: 6,
                fields: [{
                    label: '到票时间',
                    type: 'datePicker',
                    dateType: 'date',
                    valueFormat: 'yyyy-MM-dd'
                }, {
                    label: '发票金额',
                    type: 'text'
                }, {
                    label: '纳入月份',
                    type: 'datePicker',
                    dateType: 'month',
                    valueFormat: 'yyyy-MM'
                }, {
                    label: '审核人员',
                    disabled: true,
                    type: 'text'
                }, {
                    label: '审核时间',
                    disabled: true,
                    type: 'datePicker',
                    dateType: 'datetime',
                    valueFormat: 'yyyy-MM-dd HH:mm:ss'
                }, {
                    label: '税率',
                    type: 'text'
                }, {
                    label: '代收款',
                    type: 'text'
                }]
            }]
        }]
    }, {
        title: '运单录入',
        cols: [{
            slot: 'image-preview',
            column: 12
        }, {
            column: 12,
            childrens: [{
                column: 2,
                fields: [{
                    label: '运单号',
                    disabled: true
                }, {
                    label: '服务方式',
                    type: 'text'
                }]
            }, {
                title: '寄件方信息',
                column: 2,
                fields: [{
                    label: '寄件方运单号',
                    type: 'text',
                    disabled: true
                }, {
                    label: '寄件公司',
                    type: 'text'
                }, {
                    label: '寄件人',
                    type: 'text'
                }, {
                    label: '短信服务号',
                    type: 'text',
                    func: () => { }
                }]
            }, {
                title: '货物信息',
                column: 2,
                fields: [{
                    label: '寄件方运单号',
                    type: 'text',
                    disabled: true
                }, {
                    label: '寄件公司',
                    type: 'text'
                }, {
                    label: '寄件人',
                    type: 'text'
                }, {
                    label: '短信服务号',
                    type: 'text',
                    func: () => { }
                }]
            }, {
                title: '选项卡测试',
                column: 2,
                tabs: [{
                    label: '个性设置',
                    fields: [{
                        label: '寄件方运单号',
                        type: 'text',
                        disabled: true
                    }, {
                        label: '寄件公司',
                        type: 'text'
                    }, {
                        label: '寄件人',
                        type: 'text'
                    }, {
                        label: '短信服务号',
                        type: 'text',
                        func: () => { }
                    }]
                }, {
                    label: '疲劳值设定',
                    slot: 'tried-setting'
                }]
            }]
        }]
    }]
}
