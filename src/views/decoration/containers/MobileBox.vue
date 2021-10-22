<template>
    <div class="mobile-box" id="mobileBox" :style="containerStyle(content.container.style)">
        <template v-for="(item, index) in content.elements" :key="index">
            <div class="edit-element" v-if="!item.hidden" :class="{ active: currentId == item.id }" :style="getElementStyle(item.style)">
                <div class="element" :id="item.id" @mousedown.stop :style="getTextStyle(item.style)">
                    <div v-if="item.type == 'text'">
                        {{ item.text }}
                    </div>
                    <template v-if="item.type == 'image'">
                        <img :src="item.attrs.src" />
                    </template>
                    <VideoView v-model="item.attrs.src" v-if="item.type == 'video'"></VideoView>
                    <audio autoplay="autoplay" v-if="item.type == 'audio'" :poster="item.attrs.poster" :loop="item.attrs.loop" :src="item.attrs.src"></audio>
                </div>
                <div class="ele-move" @mousedown.stop="onMousedown" :data-index="index" data-direction="m" @contextmenu.stop="onContextMenu(item.id, index, $event)"></div>
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
        </template>
    </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from "vue"
import { useStore } from "vuex"
import { StyleType } from "@/store/page"
import { ElementsType } from "@/store/page"
import ContextMenu from "@/components/ContextMenu"
import { deepClone, styleToString, startAnimate, genNonDuplicateID } from "@/utils"
import mouseHook from "./onMousedown"
import VideoView from "@/components/VideoView.vue"

import { ContextMenuItem } from "@/components/ContextMenu/MenuType"
import "animate.css"
export default defineComponent({
    components: { VideoView },
    setup() {
        const store = useStore()
        const content = computed(() => store.state.page.content)
        const excludes = ["top", "left", "transform", "zIndex"]
        const currentId = computed(() => store.state.page.currentElementsId)

        const getElementStyle = (style: StyleType) => {
            let opt = { left: style.left, top: style.top, transform: style.transform, zIndex: style.zIndex }
            return styleToString(opt)
        }
        const getTextStyle = (style: StyleType) => {
            let opt = deepClone(style)
            excludes.forEach((a) => {
                delete opt[a]
            })
            return styleToString(opt)
        }
        const { onMousedown } = mouseHook()

        const getAnimate = async () => {
            content.value.elements.forEach((item: ElementsType) => {
                item.animateList && item.animateList.length && startAnimate(item)
            })
        }
        const containerStyle = (style: StyleType) => {
            return styleToString(style)
        }
        onMounted(() => {
            getAnimate()
        })
        const onContextMenu = (id: string, index: number, e: MouseEvent) => {
            if (index < 0) return
            store.commit("setCurrent", id)
            let zIndex = content.value.elements[index].style.zIndex || 50
            e.preventDefault()
            let list: Array<ContextMenuItem> = [
                {
                    title: "删除",
                    // icon: 'el-icon-top',
                    click: function () {
                        // content.value.splice(index, 1)
                        store.commit("elementRemove", id)
                    }
                },
                {
                    title: "复制",
                    // icon: 'el-icon-top',
                    click: function () {
                        var newEle = deepClone(content.value.elements[index])
                        newEle.style.left = parseFloat(newEle.style.left) + 10
                        newEle.style.top = parseFloat(newEle.style.top) + 20
                        newEle.id = "element_" + genNonDuplicateID(6)
                        store.commit("elementAdd", newEle)
                    }
                },
                {
                    title: "上移一层",
                    // icon: 'el-icon-top',
                    click: function () {
                        content.value.elements[index].style.zIndex = ++zIndex
                    }
                },
                {
                    title: "下移一层",
                    // icon: 'el-icon-top',
                    click: function () {
                        content.value.elements[index].style.zIndex = --zIndex
                    }
                }
            ]
            ContextMenu({
                event: e,
                contextMenuList: list,
                success: () => {
                    console.log("success")
                }
            })
        }
        return {
            excludes,
            content,
            currentId,
            getElementStyle,
            getTextStyle,
            onMousedown,
            getAnimate,
            onContextMenu,
            containerStyle
        }
    }
})
</script>

<style lang="scss" scoped>
.mobile-box {
    position: relative;
    left: 50%;
    top: 0;
    margin-top: 114px;
    box-shadow: 0 0 5px rbga(0, 0, 0, 0.05);
    border: 1px solid #eee;
    display: inline-block;
    overflow: hidden;
    width: 375px;
    margin-left: -175px;
    min-height: 570px;
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
            img,
            video {
                width: 100%;
                height: 100%;
            }
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
