/**
 * @copyright (c) 2018, www.wicoder.net. All rights reserved.
 * @fileOverview 通用查询
 * @author xuzengqiang <253948113@qq.com>
 * @date 2018-05-30 12:10:20
 * @version 1.0.0
 */
dom.ready(() => {
  new Vue({
    el: '#app',
    delimiters: ['${', '}'],
    data () {
      return {
        fieldsJSONStr: "",
        fieldStr: '应付编号，供应商简称，应付公司，纳入月份，应付分类，计划应付金额，异常金额，异常月份，实际应付金额，月结天数，发票类型，开票金额，代收款，承担税点，应付税金，已付金额，允许差额，异常说明，应付余额，有无对账，排款日期，排款备注，出账公司名称，应付审核人员，应付审核时间，代收月份，录单人员，录单时间，支付方式，数据来源，开户名，开户账号，开户行，排款备注，已到发票金额，上次排款日，本次排款日，排款人，是否收账单，序列号，对账人，已付金额1，应付余额1',
        lackFieldNames: [],
        resultFields: [],
        resultFieldsJSONString: ''
      }
    },
    computed: {
      fieldNames () {
        const fieldNames = []
        this.fieldStr.trim().split(/(,|，)/).forEach(fieldName => {
          fieldName = fieldName.trim()
          if (fieldName) {
            fieldNames.push(fieldName.trim())
          }
        })
        return fieldNames
      },
      fields () {
        let fields = []
        try {
          let fieldsJSON = JSON.parse(this.fieldsJSONStr)
          if (Array.isArray(fieldsJSON)) {
            fields = fieldsJSON
          }
        } catch (e) {
          this.$message.warning('JSON数据解析失败')
        }
        return fields
      }
    },
    methods: {
      builder () {
        if (Array.isArray(this.fields) && this.fields.length) {
          let found
          this.lackFieldNames = []
          this.resultFieldsJSONString = ''
          this.resultFields = []
          this.fieldNames.forEach(fieldName => {
            found = false
            this.fields.forEach(field => {
              if (field.label === fieldName) {
                this.resultFields.push(field)
                found = true
              }
            })

            if (!found) {
              this.lackFieldNames.push(fieldName)
            }
          })

          if (this.resultFields.length) {
            this.resultFieldsJSONString = JSON.stringify(this.resultFields, null, '  ')
          }

          return
        }
        this.$message.warning('配置信息为空,请检查')
      }
    }
  })
})
