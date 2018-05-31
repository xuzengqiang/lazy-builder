/**
 * @copyright (c) 2018, www.wicoder.net. All rights reserved.
 * @fileOverview 项目前端入口文件
 * @author xuzengqiang <253948113@qq.com>
 * @date 2018-05-30 12:10:20
 * @version 1.0.0
 */
dom.ready(() => {
    const icons = [
        'voice',
        'novoice',
        'next',
        'previous',
        'unie038',
        'remind',
        'xiangzuo4',
        'xiangyou4'
    ]

    new Vue({
        el: '#app',
        delimiters: ['${', '}'],
        data () {
            return {
                build: '开始构建',
                currentModule: 'index',
                authorModel: {
                    author: '',
                    router: ''
                },
                formToolList: [{
                    label: '刷新',
                    icon: 'refresh'
                }, {
                    label: '新增',
                    icon: 'plus'
                }, {
                    label: '删除',
                    icon: 'delete'
                }, {
                    label: '审核',
                    icon: 'shenhe'
                }, {
                    label: '反审',
                    icon: 'shenhe'
                }, {
                    label: '通用查询',
                    key: 'custom-filter',
                    icon: 'search'
                }, {
                    label: '个性设置',
                    icon: 'custom'
                }],
                formToolModel: {
                    label: '',
                    value: ''
                },
                yesOrNo: [{
                    label: '是',
                    value: 'yes'
                }, {
                    label: '否',
                    value: 'no'
                }],
                inputVisible: false,
                inputValue: '',
                dialogVisible: false,
                icons: icons,
                toolList: [],
                toolDialogVisible: false,
                toolModel: {
                    label: '',
                    icon: ''
                }
            }
        },
        methods: {
            transport () {
                axios({
                    method: 'POST',
                    baseURL: 'http://localhost:3000',
                    url: '/builder'
                }).then(data => {
                    console.error(data)
                }).catch(error => {
                    console.error(error)
                })
            },
            handleClose (tag) {
                this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
            },

            showInput () {
                this.inputVisible = true;
                this.$nextTick(_ => {
                    this.$refs.saveTagInput.$refs.input.focus();
                });
            },

            handleInputConfirm () {
                let inputValue = this.inputValue;
                if (inputValue) {
                    this.dynamicTags.push(inputValue);
                }
                this.inputVisible = false;
                this.inputValue = '';
            },

            addFormTool () {
                this.dialogVisible = false
                this.formToolList.push({
                    label: this.formToolModel.label,
                    icon: this.formToolModel.icon
                })
            },

            addTool () {
                this.toolDialogVisible = false
                this.toolList.push({
                    label: this.toolModel.label,
                    icon: this.toolModel.icon
                })
            }
        }
    })
})
