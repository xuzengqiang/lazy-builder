/*
 * @fileOverview: 支持的图标列表
 * @author: xuzengqiang
 * @date: 2018-06-06 15:23:51
 */

(window => {
  const icons = [
    'voice',
    'novoice',
    'next',
    'previous',
    'unie038',
    'remind',
    'xiangzuo4',
    'xiangyou4',
    'dayin',
    'right-arr',
    'left-arr',
    'ai-rew-right',
    'ai-rew-left',
    'screenfull2',
    'suoxiao',
    'first',
    'last',
    'dian',
    'jiesuo',
    'screenfull',
    'suo',
    'shenhe',
    'ERP_xiangzuojiantou',
    'ERP_xiangyoujiantou',
    'flight',
    'jiantou-copy',
    'fanhui',
    'location',
    'avatar',
    'customer',
    'aging',
    'bell',
    'checkbox-selected',
    'custom',
    'head-message',
    'm-order',
    'unfold',
    'logo',
    'search',
    'caretdown',
    'right',
    'down',
    'unfoldmore',
    'up',
    'minus',
    'delete',
    'export',
    'import',
    'close',
    'reset',
    'save',
    'saveas',
    'plus',
    'pen',
    'log',
    'dispatch',
    'sort',
    'copy'
  ]

  /**
   * 图标搜索
   * @param {String} name - 名称
   */
  window.IconSearch = name => {
    const matchs = []
    name = name ? (name + '').trim() : ''
    if (name) {
      icons.forEach(icon => {
        if (icon.indexOf(name) !== -1) {
          matchs.push(icon)
        }
      })
      return matchs
    }
    return icons
  }
})(window)

