<template>
    <div class="my-works">
        <a-tabs v-model:activeKey="listQuery.type" @change="loadData">
            <a-tab-pane :key="tab.key" :tab="tab.title" v-for="tab in tabMap">
                <div class="file-content">
                    <Spin :spinning="loading">
                        <div class="content">
                            <component :is="tab.component" :list="list" v-model="selectList"></component>
                            <Empty :image="simpleImage" v-if="!loading && !list.length" />
                        </div>
                    </Spin>
                    <div class="page">
                        <Pagination v-model:current="listQuery.page" :total="total" @change="loadData" />
                    </div>
                </div>
            </a-tab-pane>
            <template #tabBarExtraContent style="line-height: 1">
                素材空间
                <BtnUpload :acceptType="listQuery.type" @success="loadData"></BtnUpload>
            </template>
        </a-tabs>
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, Ref, ref } from "vue"
import { Pagination, Empty, Spin } from "ant-design-vue"
import ImageList from "./worksList/ImageList.vue"
import VideoList from "./worksList/VideoList.vue"
import AudioList from "./worksList/AudioList.vue"
import BtnUpload from "@/components/upload/BtnUpload.vue"
import * as I from "@/api/interface"
import api from "@/api"
import { useListPageHook } from "@/hooks/useListPageHook"
export default defineComponent({
    name: "material",
    components: { BtnUpload, Pagination, Empty, Spin, ImageList, VideoList, AudioList },
    setup() {
        const listQuery: Ref<I.scene.homelistparam> = ref({
            page: 1,
            pageSize: 10,
            type: "image"
        })
        const tabMap = ref([
            {
                title: "图片",
                key: "image",
                component: "ImageList"
            },
            {
                title: "视频",
                key: "video",
                component: "VideoList"
            },
            {
                title: "音乐",
                key: "audio",
                component: "AudioList"
            }
        ])
        const { total, loading, list, loadData } = useListPageHook<I.file.baseRow, I.file.baseRowParams>({
            api: api.fileApi.fileList,
            params: listQuery.value
        })
        onMounted(() => {
            setTimeout(() => {
                loadData()
            })
        })
        const selectList: Ref<Array<I.file.baseRow>> = ref([])
        return {
            tabActiveKey: ref("1"),
            list,
            selectList,
            total,
            loading,
            listQuery,
            loadData,
            tabMap,
            simpleImage: Empty.PRESENTED_IMAGE_SIMPLE
        }
    }
})
</script>
