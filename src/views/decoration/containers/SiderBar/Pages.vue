<template>
    <div class="page-container">
        <div class="page-list">
            <div class="item" :class="{ active: currentPageId == item.id }" v-for="(item, i) in pages" :key="item.id" @click="select(item)">
                <div class="cover"><a-image class="image" :src="item.cover" object-fit="cover" :preview="false"></a-image></div>
                <div class="num">{{ i + 1 }}</div>
                <div class="controls">
                    <div class="btn" @click="remove(item)"><DeleteOutlined /></div>
                </div>
            </div>
        </div>
        <div class="btn-add" @click="add">添加页面</div>
    </div>
</template>
<script lang="ts">
import { defineComponent, ref, Ref, computed } from "vue"
import { useStore, Store } from "vuex"
import { useRoute } from "vue-router"
import api, { I } from "@/api"
import * as Utils from "@/utils"
import { GlobalDataProps } from "@/store"
import { DeleteOutlined } from "@ant-design/icons-vue"
import { Modal, message } from "ant-design-vue"

export default defineComponent({
    components: { DeleteOutlined },
    setup() {
        const route = useRoute()
        const store: Store<GlobalDataProps> = useStore()
        const id = route.query.id || ""
        const pages: Ref<Array<I.scenePage.listrow>> = ref([])
        const currentPageId = computed(() => store.state.page.currentPageId)
        const add = () => {
            const opt = {
                name: "页面" + Utils.genNonDuplicateID(6),
                sceneId: +id
            }

            api.sceneApi.page.save(opt).then(() => {
                loadData()
            })
        }
        const loadData = () => {
            api.sceneApi.page.list({ sceneId: +id }).then((res) => {
                pages.value = res.result
                if (!res.result.length) {
                    add()
                }
                if (!currentPageId.value && res.result.length) {
                    const page = res.result[0]
                    store.commit("setPageId", page.id)
                    if (page.elements) {
                        store.commit("setElements", JSON.parse(page.elements))
                    }
                }
            })
        }
        loadData()
        const select = (page: I.scenePage.listrow) => {
            store.commit("setPageId", page.id)
            const elements = (page.elements && JSON.parse(page.elements)) || []
            store.commit("setElements", elements)
        }
        const remove = (data: I.scenePage.listrow) => {
            Modal.confirm({
                title: "确认删除页面[" + data.name + "]吗?",
                onOk() {
                    api.sceneApi.page.remove(data.id).then(() => {
                        message.success("删除成功")
                        loadData()
                    })
                }
            })
        }

        return {
            pages,
            add,
            currentPageId,
            select,
            remove
        }
    }
})
</script>
<style scoped lang="scss">
.page-container {
    position: relative;
    height: 100%;
}
.btn-add {
    position: absolute;
    bottom: 10px;
    left: 10px;
    right: 10px;
    display: block;
    text-align: center;
    background: $color-primary;
    color: #fff;
    line-height: 36px;
    border-radius: 36px;
    cursor: pointer;
    &:hover {
        opacity: 0.9;
    }
}
.page-list {
    padding: 20px 0;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 60px;
    overflow: auto;
    overflow-x: hidden;
    .item {
        margin: 0 auto;
        margin-bottom: 20px;
        cursor: pointer;
        position: relative;
        &.active {
            .cover {
                border-color: $color-primary;
            }
        }
        &:hover {
            .controls {
                display: block;
            }
        }
        .cover {
            width: 170px;
            height: 288px;
            margin: 0 auto;
            background: #fff;
            overflow: hidden;
            border: 1px solid $color-border;
        }
        .num {
            position: absolute;
            width: 22px;
            height: 22px;
            line-height: 22px;
            left: 5px;
            top: 50%;
            transform: translateY(-50%);
            text-align: center;
            color: #999;
            border-radius: 26px;
            border: 1px solid $color-border;
        }
        .controls {
            position: absolute;
            top: 0;
            right: 0;
            width: 36px;
            text-align: center;
            display: none;
            color: #999;
            .btn {
                border-radius: 30px;
                width: 30px;
                height: 30px;
                line-height: 30px;
                display: inline-block;
                &:hover {
                    background: rgba(0, 0, 0, 0.1);
                }
            }
        }
    }
}
</style>
