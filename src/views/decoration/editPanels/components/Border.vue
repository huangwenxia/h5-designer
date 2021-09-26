<template>
    <div>
        <div class="edit-item" style="overflow: unset">
            <span class="label"> 边框颜色： </span>
            <div class="value">
                <!-- <Color :color="data.style.borderColor" @color-chenge="colorChenge"></Color> -->
                <ColorPicker  v-model="data.style.borderColor"></ColorPicker>
            </div>
        </div>
        <div class="edit-item">
            <span class="label"> 边框尺寸： </span>
            <div class="value">
                <a-row>
                    <a-col :span="10">
                        <a-slider v-model:value="data.style.borderWidth" :min="0" />
                    </a-col>
                    <a-col :span="2">
                        <a-input-number v-model:value="data.style.borderWidth" :min="0" style="margin-left: 10px" />
                    </a-col>
                </a-row>
            </div>
        </div>
        <div class="edit-item">
            <span class="label"> 边框样式： </span>
            <div class="value">
                <a-select ref="select" v-model:value="data.style.borderStyle" style="width: 188px" @change="handleChange">
                    <a-select-option value="">无</a-select-option>
                    <a-select-option value="solid">——————</a-select-option>
                    <a-select-option value="dashed">---------------</a-select-option>
                    <a-select-option value="dotted">····························</a-select-option>
                </a-select>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, ref, Ref, computed } from "vue"
import { useStore } from "vuex"
import { ElementsType } from "@/store/page"
import Color from "./Color.vue"

import { ColorPicker } from "@tucy/vue3-color";
import "@tucy/vue3-color/lib/vue3-color.css";
interface colorType {
    rgba: string
    hex: string
}
export default defineComponent({
    components: { Color ,ColorPicker},
    setup() {
        const store = useStore()
        const data: Ref<ElementsType> = ref(computed(() => store.state.page.currentElement))
        const handleChange = () => {
            if (!data.value.style.borderStyle) {
                delete data.value.style.borderStyle
            }
        }
        const colorChenge = (val: colorType) => {
            data.value.style.borderColor = val.hex
        }
        return {
            data,
            handleChange,
            colorChenge,
        }
    }
})
</script>
<style lang="sass" scoped></style>
