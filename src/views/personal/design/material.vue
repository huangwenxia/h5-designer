<template>
    <div class="my-works">
        <a-tabs v-model:tabActiveKey="tabActiveKey">
            <a-tab-pane key="1" tab="图片">
                <div class="file-content">
                    <Spin :spinning="loading">
                        <div class="content">
                            <ImageList :list="list" v-model="selectList" />
                            <Empty :image="simpleImage" v-if="!loading && !list.length" />
                        </div>
                    </Spin>
                    <div class="page">
                        <Pagination v-model:current="listQuery.page" :total="total" @change="loadData" />
                    </div>
                </div>
            </a-tab-pane>
            <a-tab-pane key="2" tab="视屏">Content of Tab Pane 2</a-tab-pane>
            <a-tab-pane key="3" tab="音乐">Content of Tab Pane 3</a-tab-pane>
            <template #tabBarExtraContent style="line-height: 1">
                素材空间
                <BtnUpload></BtnUpload>
            </template>
        </a-tabs>
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, Ref, ref } from "vue"
import { Pagination, Empty, Spin } from "ant-design-vue"
import ImageList from "@/components/FileService/modules/ImageList.vue"
import BtnUpload from "@/components/upload/BtnUpload.vue"
import * as I from "@/api/interface"
import api from "@/api"

export default defineComponent({
    name: "material",
    components: { BtnUpload, Pagination, Empty, Spin, ImageList },
    setup() {
        const loading = ref(false)
        const total: Ref<number | string> = ref(0)
        const list: Ref<Array<I.file.baseRow>> = ref([])
        onMounted(() => {
            setTimeout(() => {
                loadData()
            })
        })
        const listQuery: Ref<I.file.IFileList> = ref({
            page: 1,
            pageSize: 12,
            type: "image"
        })

        const loadData = () => {
            loading.value = true
            api.fileApi
                .fileList(listQuery.value)
                .then((res) => {
                    list.value = res.result.rows
                    total.value = res.result.count
                })
                .finally(() => {
                    loading.value = false
                })
        }
        const selectList: Ref<Array<I.file.baseRow>> = ref([])
        return {
            tabActiveKey: ref("1"),
            list,
            selectList,
            total,
            loading,
            listQuery,
            loadData,
            simpleImage: Empty.PRESENTED_IMAGE_SIMPLE
        }
    }
})
</script>
