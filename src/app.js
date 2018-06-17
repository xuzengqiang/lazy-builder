/**
 * @copyright (c) 2018, www.wicoder.net. All rights reserved.
 * @fileOverview 项目前端入口文件
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
        currentModule: 'index',
        /**
         * 菜单配置
         * @property {String} router - 菜单路由
         * @property {String} name - 菜单名称
         */
        menu: {
          router: '',
          name: ''
        }
      }
    },
    mounted () {
      console.error(AddModifyMixin)
      window.__LAZY_BUILDER__ = this
    },
    mixins: [CacheEngine, AddModifyMixin, IndexMixin],
    methods: {
      /**
       * 重置所有数据
       */
      resetData () {
        this.$confirm('数据重置后无法恢复,确定重置吗?', '温馨提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(data => {
          Object.assign(this.$data, this.$options.data.apply(this))
        })
      },

      /**
       * 完整构建
       * @description
       * 会构建出一整套的模块代码
       */
      completeBuilder () {
        this.$confirm('确定构建一整套模块代码吗?', '温馨提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(data => {
          axios
            .post('http://localhost:3000/complete-builder', {
              menu: this.menu,
              /** 首页配置 */
              indexModel: this.indexModel,
              /** 新增修改页配置 */
              addModifyModel: this.addModifyModel
            })
            .then(data => {
              console.error(data)
            })
            .catch(error => {
              console.error(error)
            })
        })
      },
      /**
       *
       */
      artTemplateBuilder () {
        this.$confirm('确定使用art-template构建一整套模块代码吗?', '温馨提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(data => {
          axios
            .post('http://localhost:3000/art-template')
            .then(data => {
              console.error(data)
            })
            .catch(error => {
              console.error(error)
            })
        })
      }
    }
  })
})
