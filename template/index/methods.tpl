/**
 * @fileOverview: 首页methods
 * @author [[author]]
 * @date [[creationDate]]
 */

export default {
  methods: {
    [[dialog.methods.tpl]]
    /**
     * 显示通用查询
     */
    showCustomFilter () {
      this.$refs.customFilter.show = true
    },
    /**
     * 显示个性设置 
     */ 
    showQueryTable () {
      this.$refs.queryTable.show = true
    },
    /**
     * 重新加载页面数据
     * @param {Boolean} params - 请求参数信息 
     */
    reload (params = {}) {
      this.$refs.queryTable.loadData(params)
    },
    /**
     * 确认操作
     * @param {Object} options - 参数信息
     */
    async _confirmOperation(options) {
      await this.$confirm(options.confirm, '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })

      const response = await this.$http(options.method, options.params || {})
      if(typeof options.success === 'function') {
        options.success(response)
      } else {
        this.$message.success(options.successMsg)
        this.reload()
      }
    },
    /**
     * 行敏感操作
     * @param {Object} options - 参数信息
     * @example
     * this._rowSensitiveOperate({
     *   confirm: '确认删除这条数据?',
     *   method: 'fms.otherIncome.disabled',
     *   successMsg: '删除成功!' 
     * }) 
     */
    _rowSensitiveOperate(options) {
      if(!this.selectedRow) {
        this.$message.warning('请选择需要操作的数据')
        return
      }

      options.params = options.params || {
        id: this.selectedRow.id
      }
      this._confirmOperation(options)
    }
  }
}