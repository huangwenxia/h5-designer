<template>
    <Panel title="图片编辑">
        <Tabs :list="tabList">
            <template v-slot:样式>
                <Collapse :list="munList">
                    <template v-slot:常规设置>
                        <div class="image-box">
                            <div class="img" :style="{ backgroundImage: 'url(' + data.attrs.src + ')' }"></div>
                        </div>
                        <div class="edit-item">
                            <a-button @click="change">更换图片</a-button>
                        </div>
                        <div class="edit-item">
                            <span class="label"> 背景： </span>
                            <div class="value"><ColorPicker v-model="data.style.backgroundColor"></ColorPicker></div>
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
import Border from "./components/Border.vue"
import Opacity from "./components/Opacity.vue"
import Align from "./components/Align.vue"
import BorderShadow from "./components/BorderShadow.vue"
import Animation from "./components/Animation.vue"
import FileService from "@/components/FileService"
import { ColorPicker } from "@tucy/vue3-color"
interface valueType {
    label: string
}
type MenuType = Array<valueType>

export default defineComponent({
    components: { Panel, Collapse, Opacity, Border, Align, BorderShadow, Tabs, Animation, ColorPicker },

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
        const change = () => {
            FileService({
                success: (files) => {
                    data.value.attrs.src = files[0].url
                }
            })
        }
        return {
            tabList,
            munList,
            data,
            rotate,
            inputChenge,
            change
        }
    }
})
</script>
<style scoped lang="scss">
.image-box {
    background: url("../../../assets/images/bgblank.svg");
    height: 100px;
    margin-bottom: 10px;
    border-radius: $radius;
    border: 1px solid $color-border;
    .img {
        width: 100%;
        height: 100%;
        position: relative;
        background-repeat: no-repeat;
        background-size: contain;
        background-position: center;
    }
}
</style>
