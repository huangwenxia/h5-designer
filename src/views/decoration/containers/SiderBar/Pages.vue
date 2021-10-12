<template>
    <div class="page-container">
        <div class="page-list">
            <div class="item" :class="{ active: currentPageId == item.id }" v-for="item in pages" :key="item.id" @click="select(item)">
                <div class="cover"><a-image class="image" :src="item.cover" object-fit="cover" :preview="false"></a-image></div>
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

export default defineComponent({
    setup() {
        const route = useRoute()
        const store: Store<GlobalDataProps> = useStore()
        const id = route.query.id || ""
        const pages: Ref<Array<I.scenePage.listrow>> = ref([])
        const currentPageId = computed(() => store.state.page.currentPageId)
        const loadData = () => {
            api.sceneApi.page.list({ sceneId: +id }).then((res) => {
                pages.value = res.result
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
        const add = () => {
            const opt = {
                name: "页面" + Utils.genNonDuplicateID(6),
                sceneId: +id
            }
            api.sceneApi.page.save(opt).then(() => {
                loadData()
            })
        }
        const select = (page: I.scenePage.listrow) => {
            store.commit("setPageId", page.id)
            const elements = (page.elements && JSON.parse(page.elements)) || []
            store.commit("setElements", elements)
        }

        return {
            pages,
            add,
            currentPageId,
            select
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
    .item {
        width: 170px;
        margin: 0 auto;
        margin-bottom: 20px;
        border: 1px solid $color-border;
        cursor: pointer;
        &.active {
            border-color: $color-primary;
        }
        .cover {
            height: 290px;
            background: #fafafa;
            overflow: hidden;
        }
    }
}
</style>
