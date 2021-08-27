<template>
    <div class="edit-item">
        <div v-for="item in list" class="icon" :class="isStyle(item.value) ? 'icon-active' : ''" @click="alignCilck(item.value)" :title="item.label" :key="item.value">
            <component :is="item.icon"></component>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, Ref, ref, computed } from "vue"
import { BorderLeftOutlined, BorderTopOutlined, BorderHorizontalOutlined, BorderBottomOutlined, BorderVerticleOutlined, BorderRightOutlined } from "@ant-design/icons-vue"
import { useStore } from "vuex"
import { ElementsType } from "@/store/page"
interface valueType {
    label: string
    value: string
    icon?: string
}
export default defineComponent({
    components: { BorderLeftOutlined, BorderHorizontalOutlined, BorderTopOutlined, BorderBottomOutlined, BorderVerticleOutlined, BorderRightOutlined },
    setup() {
        let el = document.getElementById("mobileBox")
        const store = useStore()
        const data: Ref<ElementsType> = ref(computed(() => store.state.page.currentElement))
        const list: Array<valueType> = [
            { icon: "BorderTopOutlined", value: "top", label: "上对齐" },
            { icon: "BorderHorizontalOutlined", value: "vertical", label: "垂直居中" },
            { icon: "BorderBottomOutlined", value: "bottom", label: "下对齐" },
            { icon: "BorderLeftOutlined", value: "left", label: "左对齐" },
            { icon: "BorderVerticleOutlined", value: "center", label: "水平居中" },
            { icon: "BorderRightOutlined", value: "right", label: "右对齐" }
        ]
        const isStyle = (row: string) => {
            let isPass = false
            if (!data.value.id) return isPass

            let elWidth = el?.offsetWidth || 0
            let elHeight = el?.offsetHeight || 0
            let height = data.value.style.height || 0
            let width = data.value.style.width || 0
            let left = data.value.style.left || 0
            let top = data.value.style.top || 0

            switch (row) {
                case "top":
                    if (top == 0) {
                        isPass = true
                    }
                    break
                case "vertical":
                    if (top == elHeight / 2 - height / 2) {
                        isPass = true
                    }
                    break
                case "bottom":
                    if (top == elHeight - height) {
                        isPass = true
                    }
                    break
                case "left":
                    if (left == 0) {
                        isPass = true
                    }
                    break
                case "center":
                    if (left == elWidth / 2 - width / 2) {
                        isPass = true
                    }
                    break
                case "right":
                    if (left == elWidth - width) {
                        isPass = true
                    }
                    break
            }
            return isPass
        }
        const alignCilck = (row: string) => {
            let elWidth = el?.offsetWidth || 0
            let elHeight = el?.offsetHeight || 0
            let height = data.value.style.height || 0
            let width = data.value.style.width || 0
            switch (row) {
                case "top":
                    data.value.style.top = 0
                    break
                case "vertical":
                    data.value.style.top = elHeight / 2 - height / 2
                    break
                case "bottom":
                    data.value.style.top = elHeight - height
                    break
                case "left":
                    data.value.style.left = 0

                    break
                case "center":
                    data.value.style.left = elWidth / 2 - width / 2

                    break
                case "right":
                    data.value.style.left = elWidth - width

                    break
            }
        }
        return {
            list,
            data,
            isStyle,
            alignCilck
        }
    }
})
</script>
<style lang="scss" scoped>
.edit-item {
    text-align: center;
    .icon {
        width: 35px;
        height: 35px;
        line-height: 32px;
        text-align: center;
        font-size: 25px;
        display: inline-block;
        vertical-align: top;
        border: 1px solid #e5e5e5;
        margin-right: 5px;
        &:hover,
        &.icon-active {
            background-color: #1890ff;
            color: #fff;
        }
    }
}
</style>
