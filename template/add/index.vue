<template>
  <div>
    <search-pager ref="searchPager"
                  :option="searchPagerConfig.option">
    </search-pager>
    <kye-form ref="form"
              :model="model"
              :rules="rules">
      [[form-fields-render]]
    </kye-form>
    [[dialog.tpl]]
    <form-footer @save="addFormSubmit"
                 @cancel="cancel" />
  </div>
</template>

<script>
  import AddModifyMixin from '../mixins/add.modify'
  import ModelConfig from '../config/model'
  export default {
    beforeRouteEnter (to, from, next) {
      next(vm => {
        vm.initModel()
      })
    },
    mixins: [
      AddModifyMixin
    ],
    methods: {
      async initModel () {
        if (this.$route.meta.layout) {
          return
        }

        this.model = ModelConfig(this)
      }
    }
  }
</script>
