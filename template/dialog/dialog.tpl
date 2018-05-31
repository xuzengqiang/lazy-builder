<!-- 弹出层 -->
        <kye-dialog v-bind="dialogOption"
                    @close="closeDynamicDialog"
                    :visible.sync="dialogOption.show">
            <component :is="dialogOption.view"
                        :dialogData="dialogData"
                        @close="closeDynamicDialog">
            </component>
        </kye-dialog>