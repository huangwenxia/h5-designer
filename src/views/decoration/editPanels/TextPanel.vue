<template>
    <Panel title="文本编辑">
        <Collapse :list="munList">
            <template v-slot:常规设置>
                <div class="edit-item">
                    <span class="label"> 文本： </span>
                    <div class="value">
                        <a-input v-model:value="data.text" aria-placeholder="文本内容" />
                    </div>
                </div>
                <Font></Font>
                <Opacity></Opacity>
            </template>
            <template v-slot:边框>
                <Border></Border>
            </template>
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
import Border from "./components/Border.vue"
import Opacity from "./components/Opacity.vue"

interface valueType {
    label: string
}
type MenuType = Array<valueType>

export default defineComponent({
    components: { Panel, Collapse, Font, Opacity, Border },

    setup() {
        const store = useStore()
        const munList: Ref<MenuType> = ref([{ label: "常规设置" }, { label: "尺寸与位置" }, { label: "边框" }, { label: "阴影" }])
        const data: Ref<ElementsType> = ref(computed(() => store.state.page.currentElement))
        return {
            munList,
            data
        }
    }
})
</script>
<style scoped lang="scss"></style>
