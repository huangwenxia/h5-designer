<!--
 * @description     表格右键菜单
 *
 * @author          重阳
 * @create          2020-01-09 15:00
-->
<template>
    <div class="context-menu" v-show="visible" :style="contextMenuStyle" id="contextMenu">
        <div class="context-item" v-for="(item, index) in contextMenuList" :key="index" :disabled="item.disabled" :class="['color-' + item.color]" @mouseup.stop="handleClick(item, $event)">
            <span class="icon" v-if="item.icon">
                <component :is="item.icon"></component>
            </span>
            <span class="name">{{ item.title }}</span>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, ref, Ref, onMounted } from "vue"
import { ContextMenuItem } from "./MenuType"
interface MenuStyleType {
    right?: string
    top?: string
    left?: string
}
export default defineComponent({
    setup() {
        const visible = ref(false)
        const doClose = ref(() => null)
        const contextMenuList: Ref<Array<ContextMenuItem | []>> = ref([])
        const event: Ref<MouseEvent | null> = ref(null)
        let contextMenuStyle: Ref<MenuStyleType> = ref({})
        const handleContextMenuStyle = () => {
            let style: MenuStyleType = {
                right: "",
                top: "",
                left: ""
            }
            if (event.value == null) {
                return style
            }
            setTimeout(() => {
                let x = (event.value && event.value.pageX) || 0
                let y = (event.value && event.value.pageY) || 0
                let mobileBox = document.documentElement
                let contextBox = document.getElementById("contextMenu")
                // 判断是否超出边界
                if (mobileBox && mobileBox.clientHeight && mobileBox.clientWidth) {
                    // let scrollHeight = mobileBox.scrollHeight
                    let winHeight = mobileBox.clientHeight
                    let scrollTop = mobileBox.scrollTop
                    let winWidth = mobileBox.clientWidth
                    let elHeight = (contextBox && contextBox.offsetHeight) || 0
                    let elWidth = (contextBox && contextBox.offsetWidth) || 0
                    if (x + elWidth > winWidth) {
                        style.right = "10px"
                    } else {
                        style.left = x + "px"
                    }
                    if (y + elHeight - scrollTop > winHeight) {
                        style["top"] = y - elHeight + "px"
                    } else {
                        style["top"] = y + "px"
                    }
                }
                contextMenuStyle.value = style
            })
        }
        const doHide = () => {
            event.value = null
            contextMenuList.value = []
            visible.value = false
            document.removeEventListener("mouseup", doHide, false)
            doClose.value()
        }
        const handleClick = (item: ContextMenuItem) => {
            if (item.disabled) return
            item.click && item.click()
            doHide()
        }
        onMounted(() => {
            setTimeout(() => {
                handleContextMenuStyle()
            })
            document.addEventListener("mouseup", doHide, false)
        })

        return {
            contextMenuList,
            visible,
            event,
            contextMenuStyle,
            doHide,
            doClose,
            handleClick
            // success
        }
    }
})
</script>
<style scoped lang="scss">
.context-menu {
    position: absolute;
    min-width: 120px;
    width: auto !important;
    z-index: 9999;
    background: #fff;
    box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.1);
    padding: 5px 0;
    border-radius: 3px;
    // z-index: 999;
    top: -99999px;

    .context-item {
        padding: 5px 10px;
        cursor: pointer;
        font-size: 13px;
        border-bottom: 1px solid #fff;
        &:hover {
            // color: #000000;
            background: rgba(0, 0, 0, 0.05);

            .tool-box {
                visibility: visible;
            }
        }
        &[disabled] {
            cursor: not-allowed;
            color: #999;
            background: #f4f4f4;
        }

        .icon {
            display: inline-block;
            width: 16px;
            height: 16px;
            margin-right: 10px;
            color: #666;
        }
    }
}
</style>
