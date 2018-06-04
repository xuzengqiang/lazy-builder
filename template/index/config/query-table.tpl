/**
 * @fileOverview query-table配置
 * @author [[author]]
 * @date [[creationDate]]
 */

export default vm => ({
  option: '[[customSearchCode]]',
  tables: [{
    searchCode: '[[customColumnCode]]',
    url: {
      method: '[[method]]'
    },
    [[operation]]
    option: {
      [[selection]]
      beforeFormReset: data => {},
      beforeFormSubmit: data => {},
      rowDblclick: row => {},
      currentChange: row => vm.selectedRow = row
    }
  }],
  tools: [[[tools]]],
  formTools: [[[formTools]]]
})