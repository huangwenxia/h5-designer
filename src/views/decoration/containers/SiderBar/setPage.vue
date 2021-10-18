<template>
    <div class="set-page">
        <Collapse :list="munList">
            <template v-slot:背景设置>
                <div class="edit-item">
                    <span class="label"> 背景图： </span>
                    <div class="value"><BackgroundImage v-model="style.background" @change="imgChange"></BackgroundImage></div>
                </div>
                <div class="edit-item">
                    <span class="label"> 背景色： </span>
                    <div class="value">
                        <BackgroundColor v-model="style.backgroundColor" @change="onChange"></BackgroundColor>
                    </div>
                </div>
            </template>
        </Collapse>
    </div>
</template>
<script lang="ts">
import { defineComponent, computed, Ref, ref } from "vue"
import { useStore } from "vuex"
import Collapse from "../../editPanels/Collapse.vue"
import BackgroundColor from "../../editPanels/components/BackgroundColor.vue"
import BackgroundImage from "../../editPanels/components/BackgroundImage.vue"

import { StyleType } from "@/store/page"

interface valueType {
    label: string
}
type MenuType = Array<valueType>
export default defineComponent({
    components: { Collapse, BackgroundColor, BackgroundImage },
    setup() {
        const store = useStore()
        const style: Ref<StyleType> = ref(computed(() => store.state.page.content.container.style))
        const munList: Ref<MenuType> = ref([{ label: "背景设置" }])
        const onChange = (color: string) => {
            if (!color || color == "rgba(0, 0, 0, 0)") {
                style.value.backgroundColor = "#fff"
            }
        }
        const imgChange = (url: string) => {
            console.log(url, "url")
            if (url) {
                style.value.backgroundSize = "100% 100%"
            } else {
                delete style.value.backgroundSize
                delete style.value.background

                // style.value.backgroundColor = style.value.backgroundColor
            }
        }
        return {
            store,
            style,
            munList,
            onChange,
            imgChange
        }
    }
})
</script>
<style lang="scss" scoped>
.set-page {
    padding: 20px 0;
    :deep(.file-upload) {
        width: 100px;
        height: 100px;
    }
}
</style>
