/*
 * @fileOverview: 首页methods
 * @author: [[author]]
 * @date: [[creationDate]]
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
    }
  }
}
