<template>
    <Modal v-model:visible="visible" :title="'选择' + typeMap[type]" @ok="handleOk" :afterClose="close" :destroyOnClose="true" width="800px">
        <div class="header">
            <BtnUpload @success="onUploadSuccess" />
        </div>
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
    </Modal>
</template>
<script lang="ts">
import { defineComponent, ref, Ref, onMounted } from "vue"
import { Modal, Pagination, Empty, Spin, message } from "ant-design-vue"
import api from "@/api"
import * as I from "@/api/interface/index"
import BtnUpload from "@/components/upload/BtnUpload.vue"
import ImageList from "./modules/ImageList.vue"

export default defineComponent({
    components: { Modal, Pagination, Empty, Spin, BtnUpload, ImageList },
    props: {
        msg: String
    },
    setup(props) {
        const visible = ref(false)
        const doClose = ref(() => null)
        const success: Ref<(files: Array<I.file.baseRow>) => void> = ref(() => null)
        const type = ref("image")
        const typeMap = ref({
            image: "图片",
            video: "视频",
            audio: "音乐"
        })
        const close = () => {
            doClose.value()
        }
        // const { loading, list, loadData } = useLoadHook({ api: api.fileApi.fileList })
        const loading = ref(false)
        const total: Ref<number | string> = ref(0)
        const list: Ref<Array<I.file.baseRow>> = ref([])
        console.log("type", type.value)
        onMounted(() => {
            setTimeout(() => {
                listQuery.value.type = type.value
                loadData()
            })
        })
        const listQuery: Ref<I.file.IFileList> = ref({
            page: 1,
            pageSize: 12,
            type: type.value
        })

        const loadData = () => {
            loading.value = true
            api.fileApi
                .fileList(listQuery.value)
                .then((res) => {
                    console.log(res, "===========res")
                    list.value = res.result.rows
                    total.value = res.result.count
                })
                .finally(() => {
                    loading.value = false
                })
        }
        const onUploadSuccess = () => {
            loadData()
        }
        const selectList: Ref<Array<I.file.baseRow>> = ref([])
        const handleOk = () => {
            if (!selectList.value.length) {
                message.error("没有选择文件")
                return
            }
            success.value(selectList.value)
        }
        return {
            close,
            visible,
            doClose,
            list,
            total,
            loading,
            listQuery,
            loadData,
            onUploadSuccess,
            simpleImage: Empty.PRESENTED_IMAGE_SIMPLE,
            selectList,
            handleOk,
            success,
            type,
            typeMap
        }
    }
})
</script>
<style lang="scss" scoped>
.header {
    margin-bottom: 10px;
}
.file-content {
    .content {
        // height: 540px;
    }
}
</style>
