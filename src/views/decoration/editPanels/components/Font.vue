<template>
    <div class="font">
        <div class="edit-item">
            <span class="label"> 字号 </span>
            <div class="value">
                <a-auto-complete v-model:value="data.style.fontSize" :options="sizeList" style="width: 100px" />
                <a-button @click="plus" :disabled="!data.style.fontSize"><SortDescendingOutlined /></a-button>
                <a-button @click="subtract" :disabled="!data.style.fontSize"><SortAscendingOutlined /></a-button>
            </div>
        </div>
        <div class="edit-item">
            <div class="icon" :class="{ 'icon-active': data.style.textAlign == item.value }" :title="item.label" @click="textAlign(item.value)" v-for="item in textList" :key="item.value">
                <component :is="item.icon"></component>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, ref, Ref, computed } from "vue"
import { useStore } from "vuex"
import { ElementsType } from "@/store/page"
import { SortAscendingOutlined, SortDescendingOutlined, AlignRightOutlined, AlignLeftOutlined, AlignCenterOutlined, MenuOutlined } from "@ant-design/icons-vue"

interface valueType {
    label: string
    value: string
    icon?: string
}
type ListType = Array<valueType>
export default defineComponent({
    components: { SortDescendingOutlined, SortAscendingOutlined, AlignRightOutlined, AlignLeftOutlined, AlignCenterOutlined, MenuOutlined },
    setup() {
        const store = useStore()
        const data: Ref<ElementsType> = ref(computed(() => store.state.page.currentElement))
        const sizeList: Ref<ListType> = ref([
            { label: "12px", value: "12" },
            { label: "14px", value: "14" },
            { label: "16px", value: "16" },
            { label: "18px", value: "18" },
            { label: "20px", value: "20" },
            { label: "22px", value: "22" },
            { label: "30px", value: "30" },
            { label: "48px", value: "48" },
            { label: "64px", value: "64" }
        ])
        const textList: ListType = [
            { icon: "AlignLeftOutlined", value: "left", label: "居左" },
            { icon: "AlignCenterOutlined", value: "center", label: "居中" },
            { icon: "AlignRightOutlined", value: "right", label: "居右" },
            { icon: "MenuOutlined", value: "justify", label: "分散对齐" }
        ]
        const plus = () => {
            if (data.value.style.fontSize) {
                data.value.style.fontSize = Number(data.value.style.fontSize) + 2
            }
        }
        const subtract = () => {
            if (data.value.style.fontSize) {
                if (data.value.style.fontSize < 8) return

                data.value.style.fontSize = Number(data.value.style.fontSize) - 2
            }
        }
        const textAlign = (align: string) => {
            data.value.style.textAlign = align
            if (align == "justify") {
                data.value.style.textAlignLast = align
            } else {
                delete data.value.style.textAlignLast
            }
        }
        return {
            data,
            sizeList,
            plus,
            subtract,
            textList,
            textAlign
        }
    }
})
</script>
<style lang="scss" scoped>
.font {
    width: 100%;

    .edit-item {
        overflow: hidden;
        width: 100%;
        margin-bottom: 10px;
        .label {
            width: 100px;
            display: inline-block;
        }
        .value {
            display: inline-block;
            vertical-align: middle;
            width: calc(100% - 100px);
            /deep/.ant-btn {
                font-size: 18px;
                padding: 3px 8px;
                margin-left: 5px;
                vertical-align: top;
            }
        }
        .icon {
            display: inline-block;
            vertical-align: top;
            border: 1px solid #f2f2f2;
            font-size: 14px;
            padding: 2px 6px;
            margin-right: 10px;
            cursor: pointer;
            &:hover,
            &.icon-active {
                background-color: #f3f3f3;
            }
        }
    }
}
</style>
