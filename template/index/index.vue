<template>
    <section>
        <query-table ref="queryTable"
                     :tables="queryTableConfig.tables"
                     :tools="queryTableConfig.tools"
                     :option="queryTableConfig.option"
                     :form-tools="queryTableConfig.formTools">
        </query-table>
        <!-- 通用查询 -->
        <custom-filter ref="customFilter"
                       :module="customFilterConfig.module">
        </custom-filter>
        [[dialog.tpl]]
    </section>
</template>
<script>
    import mixins from './mixins'
    export default {
        mixins
    }
</script>