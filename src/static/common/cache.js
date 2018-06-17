/*
 * @fileOverview: 缓存机制
 * @author: xuzengqiang
 * @date: 2018-06-07 00:06:32
 */
(window => {
  /**
   * 缓存的主键
   * @type {String}
   */
  const CACHE_KEY = '__LAZY_BUILDER__'

  /**
   * 缓存时间
   * @description 每隔30s缓存一次数据
   * @type {Number}
   */
  const CACHE_INTEVARL = 30

  const CacheEngine = {
    mounted () {
      const cacheData = window.localStorage.getItem(CACHE_KEY)

      // 如果存在缓存
      if (cacheData) {
        console.log('取缓存...')
        Object.assign(this.$data, JSON.parse(cacheData))
      }

      this.runCache()
    },
    methods: {
      /**
       * 启动缓存
       */
      runCache () {
        console.error('启动缓存机制')
        setInterval(() => this.addStorage(), CACHE_INTEVARL * 1000)
      },

      /**
       * 写入缓存
       * @description 这里会将data中所有的数据缓存
       */
      addStorage () {
        window.localStorage.setItem(CACHE_KEY, JSON.stringify(this.$data))
        this.$notify({
          title: '温馨提示',
          message: '数据已存入缓存'
        })
      },

      /**
       * 清除缓存
       */
      clearStorage () {
        this.$confirm('清除的缓存无法恢复,确定清空吗?', '温馨提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(data => {
          window.localStorage.removeItem(CACHE_KEY)
        })
      },
    }
  }

  window.CacheEngine = CacheEngine
})(window)
