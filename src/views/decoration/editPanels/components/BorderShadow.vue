<template>
    <div class="borser-shadow">
        <div class="edit-item" style="overflow: unset">
            <span class="label"> 颜色： </span>
            <div class="value">
                <Color :color="shadow.color" @color-chenge="colorChenge"></Color>
            </div>
        </div>

        <div class="edit-item">
            <span class="label"> Y轴： </span>
            <div class="value">
                <a-row>
                    <a-col :span="10">
                        <a-slider v-model:value="shadow.YAxial" @change="toggleShadow" />
                    </a-col>
                    <a-col :span="2">
                        <a-input-number v-model:value="shadow.YAxial" :min="0" :max="100" @change="toggleShadow" style="margin-left: 16px" />
                    </a-col>
                </a-row>
            </div>
        </div>
        <div class="edit-item">
            <span class="label"> X轴： </span>

            <div class="value">
                <a-row>
                    <a-col :span="10">
                        <a-slider v-model:value="shadow.XAxial" @change="toggleShadow" />
                    </a-col>
                    <a-col :span="2">
                        <a-input-number v-model:value="shadow.XAxial" :min="0" :max="100" @change="toggleShadow" style="margin-left: 16px" />
                    </a-col>
                </a-row>
            </div>
        </div>
        <div class="edit-item">
            <span class="label"> 大小： </span>
            <div class="value">
                <a-row>
                    <a-col :span="10">
                        <a-slider v-model:value="shadow.size" @change="toggleShadow" />
                    </a-col>
                    <a-col :span="2">
                        <a-input-number v-model:value="shadow.size" :min="0" :max="100" @change="toggleShadow" style="margin-left: 16px" />
                    </a-col>
                </a-row>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, ref, Ref, computed } from "vue"
import { useStore } from "vuex"
import { ElementsType } from "@/store/page"
import Color from "./Color.vue"
interface shadowType {
    color?: string
    size?: number
    YAxial?: number
    XAxial?: number
}
interface colorType {
    rgba: string
    hex: string
}

export default defineComponent({
    components: { Color },
    setup() {
        const store = useStore()
        const data: Ref<ElementsType> = ref(computed(() => store.state.page.currentElement))
        const shadow: Ref<shadowType> = ref({
            color: "",
            size: 0,
            YAxial: 0,
            XAxial: 0
        })
        const toggleShadow = () => {
            let size: string = shadow.value.size + "px"
            let YAxial: string = shadow.value.YAxial + "px "
            let XAxial: string = shadow.value.XAxial + "px "
            let opt: string = XAxial + YAxial + size + " 0px " + shadow.value.color
            data.value.style.boxShadow = opt
        }
        const colorChenge = (val: colorType) => {
            shadow.value.color = val.hex
            toggleShadow()
        }
        return {
            shadow,
            data,
            toggleShadow,
            colorChenge
        }
    }

    // methods: {
    //     init() {
    //         this.shadow = {
    //             type: "1",
    //             color: "",
    //             size: undefined,
    //             YAxial: 0,
    //             XAxial: 0
    //         }
    //         let regex = /rgba\(([\d.,\s]+)\)/g
    //         if (this.data.boxShadow) {
    //             let shadowRgb = this.data.boxShadow.match(regex)
    //             if (shadowRgb != null && shadowRgb.length) {
    //                 this.shadow.color = shadowRgb[0]
    //             }
    //             let str = this.data.boxShadow.split("px")
    //             this.shadow.size = parseInt(str[2].replace(/ /g, ""))
    //             this.shadow.YAxial = parseInt(str[1].replace(/ /g, ""))
    //             this.shadow.XAxial = parseInt(str[0].replace(/ /g, ""))
    //             this.shadow.type = "2"
    //         }
    //     },
})
</script>

<style scoped lang="scss"></style>
