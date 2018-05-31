/**
 * @fileOverview: 首页data配置
 * @author: [[author]]
 * @date: [[creationDate]]
 */
import queryTableConfig from '../config/query-table'
import customFilterConfig from '../config/custom-filter'
export default {
  data () {
    return {
      [[dialog.data.tpl]]
      [[selection.tpl]]
      loading: false,
      selectedRow: null,
      queryTableConfig: queryTableConfig(this),
      customFilterConfig: customFilterConfig(this)
    }
  }
}