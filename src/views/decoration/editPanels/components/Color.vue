<template>
    <div class="color">
        <div class="color-main" :style="{ 'background-color': colors }" @mousedown.stop="colorDown"></div>
        <div class="color-sketch" v-if="hiden" @mousedown.stop>
            <Sketch v-model="colors" @change="onChange" />
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue"
import "@tucy/vue3-color/lib/vue3-color.css"
import { Sketch } from "@tucy/vue3-color"
interface colorType {
    rgba: string
    hex: string
}
const PropsType = {
    color: {
        type: String,
        default: ""
    }
}
export default defineComponent({
    components: { Sketch },
    emits: ["color-chenge"],
    props: PropsType,
    setup(props, context) {
        let colors = ref(props.color)
        let hiden = ref(false)
        const onChange = (color: colorType) => {
            context.emit("color-chenge", color)
        }
        const colorDown = () => {
            hiden.value = true
            console.log(1111, hiden.value)

            let app: HTMLElement | null = document.getElementById("app")
            let panel: HTMLElement | null = document.getElementById("edit-panel-content")
            app && app.addEventListener("mousedown", colorMousedown)
            panel && panel.addEventListener("mousedown", colorMousedown)
        }
        const colorMousedown = () => {
            hiden.value = false
        }
        return {
            colors,
            hiden,
            onChange,
            colorMousedown,
            colorDown
        }
    }
})
</script>
<style lang="scss" scoped>
.color {
    position: relative;
    z-index: 100;
    .color-main {
        width: 30px;
        height: 30px;
        border: 1px solid #e5e5ee;
        cursor: pointer;
    }
    .color-sketch {
        width: 100%;
        position: absolute;
        left: -350px;
        top: -120px;
        padding: 10px;
        /deep/.vc-sketch {
            // height: 350px;
            margin-right: 10px;
        }
    }
}
</style>
