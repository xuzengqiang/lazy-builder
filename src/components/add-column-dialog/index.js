/*
 * @fileOverview: 栏目新增
 * @author: xuzengqiang
 * @date: 2018-06-02 17:49:18
 */
; (window => {
    const DEFAULT_COLUMN = 4
    const ModelConfig = () => {
        return {
            title: '',
            main: null,
            leftcontent: null,
            rightcontent: null
        }
    }

    const ColumnConfig = () => {
        return {
            main: 24,
            leftcontent: 0,
            rightcontent: 0
        }
    }

    const getModel = totalspan => {
        return {
            title: '',
            fields: [],
            fileName: '',
            fieldsConfig: '',
            column: DEFAULT_COLUMN,
            totalspan: totalspan
        }
    }

    const AddColumnDialog = {
        template: '#add-column-dialog-template',
        name: 'AddColumnDialog',
        data () {
            return {
                model: ModelConfig(),
                layout: 'one-column',
                show: false,
                column: ColumnConfig()
            }
        },
        watch: {
            show (value) {
                if (value) {
                    this.model = ModelConfig()
                    this.column = ColumnConfig()
                }
            }
        },
        methods: {
            addColumn () {
                const column = this.column

                const model = {
                    title: this.model.title.trim(),
                    main: getModel(column.main),
                    leftcontent: this.layout !== 'one-column' ? getModel(column.leftcontent) : null,
                    rightcontent: this.layout === 'three-column' ? getModel(column.rightcontent) : null
                }

                this.show = false
                this.$emit('add-column', model)
            },
            /**
             * 点击布局方式之后的处理
             * @param {String} layout - 布局方式
             */
            layoutClicked (layout) {
                this.layout = layout
                switch (layout) {
                    case 'one-column':
                        this.setColumn(24, 0)
                        break
                    case 'two-column':
                        this.setColumn(12, 12)
                        break
                    case 'three-column':
                        this.setColumn(8, 8)
                }
            },
            /**
             * 设置列数
             * @param {Number} main - 主栏目列数
             * @param {Number} leftcontent - 左侧栏目列数
             */
            setColumn (mainColumn, leftContentColumn) {
                this.column.main = mainColumn
                this.column.leftcontent = leftContentColumn
                this.column.rightcontent = 24 - mainColumn - leftContentColumn
            }
        }
    }

    window.AddColumnDialog = AddColumnDialog
})(window)
