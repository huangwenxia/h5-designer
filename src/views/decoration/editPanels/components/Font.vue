<template>
    <div class="font">
        <div class="edit-item">
            <span class="label"> 字号： </span>
            <div class="value">
                <a-auto-complete v-model:value="data.style.fontSize" :options="sizeList" style="width: 100px" />
                <a-button @click="plus" :disabled="!data.style.fontSize"><SortDescendingOutlined /></a-button>
                <a-button @click="subtract" :disabled="!data.style.fontSize"><SortAscendingOutlined /></a-button>
            </div>
        </div>
        <div class="sample">
            <a-radio-group v-model:value="radioButton" @change="radioClick">
                <a-radio-button value="32"><span style="font-size: 18px; font-weight: bold">标题</span></a-radio-button>
                <a-radio-button value="22"><span style="font-size: 16px">副标题</span></a-radio-button>
                <a-radio-button value="14"><span style="font-size: 14px">正文</span></a-radio-button>
            </a-radio-group>
        </div>
        <div class="edit-item">
            <span class="label"> 格式：</span>
            <div class="value">
                <div class="icon" :class="textStyle(item.value) ? 'icon-active' : ''" :title="item.label" @click="fontClick(item.value)" v-for="item in fontList" :key="item.value">
                    <component :is="item.icon"></component>
                </div>
            </div>
        </div>
        <div class="edit-item">
            <span class="label"> 对齐： </span>
            <div class="value">
                <div class="icon" :class="{ 'icon-active': data.style.textAlign == item.value }" :title="item.label" @click="textAlign(item.value)" v-for="item in textList" :key="item.value">
                    <component :is="item.icon"></component>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, ref, Ref, computed } from "vue"
import { useStore } from "vuex"
import { ElementsType } from "@/store/page"
import { SortAscendingOutlined, SortDescendingOutlined, AlignRightOutlined, UnderlineOutlined, StrikethroughOutlined, ItalicOutlined, AlignLeftOutlined, AlignCenterOutlined, MenuOutlined, BoldOutlined } from "@ant-design/icons-vue"

interface valueType {
    label: string
    value: string
    icon?: string
}
type ListType = Array<valueType>
export default defineComponent({
    components: { SortDescendingOutlined, SortAscendingOutlined, AlignRightOutlined, StrikethroughOutlined, ItalicOutlined, UnderlineOutlined, AlignLeftOutlined, AlignCenterOutlined, MenuOutlined, BoldOutlined },
    setup() {
        const store = useStore()
        const data: Ref<ElementsType> = ref(computed(() => store.state.page.currentElement))
        const radioButton = ref("")
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
        const fontList: ListType = [
            { icon: "BoldOutlined", value: "bold", label: "加粗" },
            { icon: "ItalicOutlined", value: "italic", label: "倾斜" },
            { icon: "UnderlineOutlined", value: "underline", label: "下划线" },
            { icon: "StrikethroughOutlined", value: "line-through", label: "删除线" }
        ]

        BoldOutlined
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
        const fontClick = ref((value: string) => {
            switch (value) {
                case "bold":
                    if (data.value.style.fontWeight) {
                        delete data.value.style.fontWeight
                    } else {
                        data.value.style.fontWeight = value
                    }
                    break
                case "italic":
                    if (data.value.style.fontStyle) {
                        delete data.value.style.fontStyle
                    } else {
                        data.value.style.fontStyle = value
                    }
                    break
                case "underline":
                    if (data.value.style.textDecoration == "underline") {
                        delete data.value.style.textDecoration
                    } else if (data.value.style.textDecoration == "underline line-through") {
                        data.value.style.textDecoration = "line-through"
                    } else if (data.value.style.textDecoration == "line-through") {
                        data.value.style.textDecoration = "underline line-through"
                    } else {
                        data.value.style.textDecoration = value
                    }

                    break
                case "line-through":
                    if (data.value.style.textDecoration == "line-through") {
                        delete data.value.style.textDecoration
                    } else if (data.value.style.textDecoration == "underline line-through") {
                        data.value.style.textDecoration = "underline"
                    } else if (data.value.style.textDecoration == "underline") {
                        data.value.style.textDecoration = "underline line-through"
                    } else {
                        data.value.style.textDecoration = value
                    }
                    break
            }
        })

        const textStyle = (value: string) => {
            let isPass = false
            switch (value) {
                case "bold":
                    if (data.value.style.fontWeight) {
                        isPass = true
                    }
                    break
                case "italic":
                    if (data.value.style.fontStyle) {
                        isPass = true
                    }
                    break
                case "underline":
                    if (data.value.style.textDecoration == "underline" || data.value.style.textDecoration == "underline line-through") {
                        isPass = true
                    }
                    break
                case "line-through":
                    if (data.value.style.textDecoration == "line-through" || data.value.style.textDecoration == "underline line-through") {
                        isPass = true
                    }
                    break
            }
            return isPass
        }
        const radioClick = () => {
            if (!radioButton.value) return
            console.log(radioButton, "radioButton")
            switch (radioButton.value) {
                case "32":
                    data.value.style.fontSize = 32
                    data.value.style.fontWeight = "bold"

                    break
                case "22":
                    data.value.style.fontSize = 22
                    delete data.value.style.fontWeight

                    break
                case "14":
                    data.value.style.fontSize = 14
                    delete data.value.style.fontWeight

                    break
            }
        }
        return {
            data,
            sizeList,
            plus,
            subtract,
            textList,
            textAlign,
            fontList,
            fontClick,
            textStyle,
            radioButton,
            radioClick
        }
    }
})
</script>
<style lang="scss" scoped>
.font {
    width: 100%;
    .value {
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
            background-color: #1890ff;
            color: #fff;
        }
    }
    .sample {
        text-align: center;
        margin: 15px 0;
        /deep/.ant-radio-button-wrapper {
            padding: 0;
            line-height: 35px;
            width: 70px;
            height: 35px;
            vertical-align: top;
        }
    }
}
</style>
