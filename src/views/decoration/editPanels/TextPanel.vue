<template>
    <Panel title="文本编辑">
        <Collapse :list="munList">
            <template v-slot:常规设置>
                <div class="edit-item">
                    <span class="label"> 文本 </span>
                    <div class="value">
                        <a-input v-model:value="data.text" aria-placeholder="文本内容" />
                    </div>
                </div>
                <Font></Font>
            </template>
            <template v-slot:边框>边框</template>
            <template v-slot:阴影>阴影</template>
        </Collapse>
    </Panel>
</template>
<script lang="ts">
import Panel from "./Panel.vue"
import { defineComponent, Ref, ref, computed } from "vue"
import Collapse from "./Collapse.vue"
import { useStore } from "vuex"
import { ElementsType } from "@/store/page"
import Font from "./components/Font.vue"

interface valueType {
    label: string
}
type MenuType = Array<valueType>

export default defineComponent({
    components: { Panel, Collapse, Font },

    setup() {
        const store = useStore()
        const munList: Ref<MenuType> = ref([{ label: "常规设置" }, { label: "边框" }, { label: "阴影" }])
        const data: Ref<ElementsType> = ref(computed(() => store.state.page.currentElement))
        return {
            munList,
            data
        }
    }
})
</script>
<style scoped lang="scss">
.edit-item {
    overflow: hidden;
    margin-bottom: 10px;
    .label {
        width: 100px;
        display: inline-block;
        vertical-align: middle;
    }
    .value {
        display: inline-block;
        vertical-align: middle;
        width: calc(100% - 100px);
        text-align: right;
        /deep/.ant-input {
            width: 100%;
        }
    }
}
</style>
