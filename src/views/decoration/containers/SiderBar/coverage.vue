<template>
    <div class="coverage">
        <div v-for="(item, index) in elements" :key="index" :class="{ 'is-active': currentId == item.id }" @contextmenu.stop="onContextMenu(item.id, index, $event)" @click.stop="select(item.id)" class="coverage-item">
            <div class="label white-space">
                {{ getlabel(item) }}
            </div>
            <div class="icon">
                <EyeInvisibleOutlined v-if="item.hidden" @click.stop="item.hidden = false" title="显示" />
                <EyeOutlined v-else @click.stop="item.hidden = true" title="隐藏" />
                <!-- <DeleteOutlined title="删除" @click.stop="remove(item.id)" /> -->
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, computed } from "vue"
import { ElementsType } from "@/store/page"
import { useStore } from "vuex"
import ContextMenu from "@/components/ContextMenu"
import { ContextMenuItem } from "@/components/ContextMenu/MenuType"
import { deepClone, genNonDuplicateID } from "@/utils"

import { EyeOutlined, EyeInvisibleOutlined, DeleteOutlined } from "@ant-design/icons-vue"
interface LabelType {
    name: string
    icon: string
    type: string
}
export default defineComponent({
    components: { EyeOutlined, EyeInvisibleOutlined, DeleteOutlined },
    setup() {
        const store = useStore()
        const elements = computed(() => store.state.page.content.elements)
        const currentId = computed(() => store.state.page.currentElementsId)
        const labelList: Array<LabelType> = [
            {
                name: "文本",
                icon: "el-icon-edit-outline",
                type: "text"
            },
            {
                name: "图片",
                icon: "el-icon-picture-outline",
                type: "image"
            },
            {
                name: "按钮",
                icon: "el-icon-thumb",
                type: "button"
            },
            {
                name: "视频",
                icon: "el-icon-video-camera",
                type: "video"
            },
            {
                name: "音乐",
                icon: "el-icon-video-camera",
                type: "audio"
            }
        ]
        const getlabel = (row: ElementsType) => {
            let opt = labelList.find((a) => a.type == row.type)
            if (!opt) return
            if (opt.type == "text") {
                return row.text
            }
            return opt.name
        }
        const remove = (id: string) => {
            store.commit("elementRemove", id)
        }
        const select = (id: string) => {
            store.commit("setCurrent", id)
        }

        const onContextMenu = (id: string, index: number, e: MouseEvent) => {
            if (index < 0) return
            store.commit("setCurrent", id)
            let zIndex = elements.value[index].style.zIndex || 50
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
                        var newEle = deepClone(elements.value[index])
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
                        elements.value[index].style.zIndex = ++zIndex
                    }
                },
                {
                    title: "下移一层",
                    // icon: 'el-icon-top',
                    click: function () {
                        elements.value[index].style.zIndex = --zIndex
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
            store,
            elements,
            currentId,
            getlabel,
            labelList,
            remove,
            select,
            onContextMenu
        }
    }
})
</script>
<style scoped lang="scss">
.coverage {
    padding: 20px 0;
    .coverage-item {
        padding: 5px 10px;
        border-bottom: 1px solid #e3e3e3;
        &:hover,
        &.is-active {
            color: #1890ff;
        }
        .label {
            max-width: calc(100% - 50px);
            display: inline-block;
            vertical-align: middle;
            &.white-space {
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
        }
        .icon {
            float: right;
            .anticon {
                margin-left: 10px;
                cursor: pointer;
            }
        }
    }
}
</style>
