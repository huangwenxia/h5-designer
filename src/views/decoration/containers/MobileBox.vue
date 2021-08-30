<template>
    <div class="mobile-box" id="mobileBox">
        <div class="edit-element" v-for="(item, index) in elements" :class="{ active: currentId == item.id }" :key="index" :style="getElementStyle(item.style)">
            <div class="element" :id="item.id" @mousedown.stop :style="getTextStyle(item.style)">
                <div v-if="item.type == 'text'">
                    {{ item.text }}
                </div>
            </div>
            <div class="ele-move" @mousedown.stop="onMousedown" :data-index="index" data-direction="m"></div>
            <div class="ele-control" @mousedown.stop>
                <div class="ctl ele-control-n" @mousedown="onMousedown" :data-index="index" data-direction="n"></div>
                <div class="ctl ele-control-e" @mousedown="onMousedown" :data-index="index" data-direction="e"></div>
                <div class="ctl ele-control-s" @mousedown="onMousedown" :data-index="index" data-direction="s"></div>
                <div class="ctl ele-control-w" @mousedown="onMousedown" :data-index="index" data-direction="w"></div>
                <div class="ctl ele-control-nw" @mousedown="onMousedown" :data-index="index" data-direction="nw"></div>
                <div class="ctl ele-control-ne" @mousedown="onMousedown" :data-index="index" data-direction="ne"></div>
                <div class="ctl ele-control-se" @mousedown="onMousedown" :data-index="index" data-direction="se"></div>
                <div class="ctl ele-control-sw" @mousedown="onMousedown" :data-index="index" data-direction="sw"></div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue"
import { useStore } from "vuex"
import { StyleType } from "@/store/page"
import { deepClone, styleToString } from "@/utils"
import mouseHook from "./onMousedown"

export default defineComponent({
    setup() {
        const store = useStore()
        const elements = computed(() => store.state.page.elements)
        const excludes = ["top", "left"]
        const getElementStyle = (style: StyleType) => {
            let opt = { left: style.left, top: style.top }
            return styleToString(opt)
        }
        const getTextStyle = (style: StyleType) => {
            let opt = deepClone(style)
            excludes.forEach((a) => {
                delete opt[a]
            })
            return styleToString(opt)
        }
        const currentId = computed(() => store.state.page.currentElementsId)
        const { onMousedown } = mouseHook()

        return {
            excludes,
            elements,
            currentId,
            getElementStyle,
            getTextStyle,
            onMousedown
        }
    }
})
</script>

<style lang="scss" scoped>
.mobile-box {
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    top: 0;
    margin-top: 114px;
    box-shadow: 0 0 5px rbga(0, 0, 0, 0.05);
    border: 1px solid #eee;
    display: inline-block;
    overflow: hidden;
    width: 350px;
    min-height: 600px;
    background-color: #fff;
    .edit-element {
        position: absolute;
        &.active {
            // border: 1px dashed #1593ff;
            .ele-control {
                display: block;
            }
        }
        .ele-move {
            position: absolute;
            z-index: 20;
            cursor: move;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
        }
        .element {
            position: relative;
            overflow: hidden;
        }
        .ele-control {
            display: none;
        }
        .ctl {
            position: absolute;
            z-index: 30;
        }

        .ele-control-n {
            //上
            top: 0;
            left: 0;
            right: 0;
            height: 5px;
            border-top: 1px dashed #3193ff;
            cursor: n-resize;
        }

        .ele-control-e {
            //右
            top: 0;
            bottom: 0;
            right: 0;
            width: 5px;
            border-right: 1px dashed #3193ff;
            cursor: e-resize;
        }

        .ele-control-s {
            //下
            left: 0;
            bottom: 0;
            right: 0;
            height: 5px;
            border-bottom: 1px dashed #3193ff;
            cursor: s-resize;
        }

        .ele-control-w {
            //左
            top: 0;
            left: 0;
            bottom: 0;
            width: 5px;
            border-left: 1px dashed #3193ff;
            cursor: w-resize;
        }

        .ele-control-nw,
        .ele-control-ne,
        .ele-control-se,
        .ele-control-sw {
            width: 8px;
            height: 8px;
            border: 1px solid #3193ff;
            border-radius: 50%;
            z-index: 35;
            background: #fff;
        }

        .ele-control-nw {
            cursor: nw-resize;
            top: 0;
            left: 0;
            transform: translate(-50%, -50%);
        }

        .ele-control-ne {
            cursor: ne-resize;
            top: 0;
            right: 0;
            transform: translate(50%, -50%);
        }

        .ele-control-se {
            cursor: se-resize;
            bottom: 0;
            right: 0;
            transform: translate(50%, 50%);
        }

        .ele-control-sw {
            cursor: sw-resize;
            bottom: 0;
            left: 0;
            transform: translate(-50%, 50%);
        }
    }
}
</style>
