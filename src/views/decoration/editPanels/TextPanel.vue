<template>
    <Panel title="文本编辑">
        <Tabs :list="tabList">
            <template v-slot:样式>
                <Collapse :list="munList">
                    <template v-slot:常规设置>
                        <div class="edit-item">
                            <span class="label"> 文本： </span>
                            <div class="value">
                                <a-input v-model:value="data.text" aria-placeholder="文本内容" />
                            </div>
                        </div>
                        <Font></Font>
                        <div class="edit-item">
                            <span class="label"> 行高： </span>
                            <div class="value">
                                <a-slider id="test" v-model:value="data.style.lineHeight" :min="16" :max="parseInt(data.style.height) * 2" />
                            </div>
                        </div>
                        <Opacity></Opacity>
                    </template>
                    <template v-slot:尺寸与位置>
                        <Align></Align>
                        <div class="edit-item">
                            <span class="label"> 宽度： </span>
                            <div class="value">
                                <a-input-number v-model:value="data.style.width" aria-placeholder="" style="width: 100%" :min="1" />
                            </div>
                        </div>
                        <div class="edit-item">
                            <span class="label"> 高度： </span>
                            <div class="value">
                                <a-input-number v-model:value="data.style.height" aria-placeholder="" style="width: 100%" :min="1" />
                            </div>
                        </div>
                        <div class="edit-item">
                            <span class="label"> 旋转： </span>
                            <div class="value">
                                <a-row>
                                    <a-col :span="10">
                                        <a-slider v-model:value="rotate" :min="0" :max="360" @change="inputChenge" />
                                    </a-col>
                                    <a-col :span="2">
                                        <a-input-number v-model:value="rotate" :min="0" @change="inputChenge" :max="360" style="margin-left: 10px" />
                                    </a-col>
                                </a-row>
                            </div>
                        </div>
                    </template>

                    <template v-slot:边框>
                        <Border></Border>
                    </template>
                    <template v-slot:阴影>
                        <BorderShadow></BorderShadow>
                    </template>
                </Collapse>
            </template>
            <template v-slot:动画>
                <Animation></Animation>
            </template>
        </Tabs>
    </Panel>
</template>
<script lang="ts">
import Panel from "./Panel.vue"
import { defineComponent, Ref, ref, computed } from "vue"
import Collapse from "./Collapse.vue"
import Tabs from "./Tabs.vue"
import { useStore } from "vuex"
import { ElementsType } from "@/store/page"
import Font from "./components/Font.vue"
import Border from "./components/Border.vue"
import Opacity from "./components/Opacity.vue"
import Align from "./components/Align.vue"
import BorderShadow from "./components/BorderShadow.vue"
import Animation from "./components/Animation.vue"

interface valueType {
    label: string
}
type MenuType = Array<valueType>

export default defineComponent({
    components: { Panel, Collapse, Font, Opacity, Border, Align, BorderShadow, Tabs, Animation },

    setup() {
        const store = useStore()
        const tabList: Ref<MenuType> = ref([{ label: "样式" }, { label: "动画" }])
        const munList: Ref<MenuType> = ref([{ label: "常规设置" }, { label: "尺寸与位置" }, { label: "边框" }, { label: "阴影" }])
        const data: Ref<ElementsType> = ref(computed(() => store.state.page.currentElement))
        const rotate = ref(0)
        const inputChenge = () => {
            if (rotate.value) {
                data.value.style.transform = "rotate(" + rotate.value + "deg)"
            } else {
                delete data.value.style.transform
            }
        }
        return {
            tabList,
            munList,
            data,
            rotate,
            inputChenge
        }
    }
})
</script>
<style scoped lang="scss"></style>
