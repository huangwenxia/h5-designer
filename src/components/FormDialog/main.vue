<template>
    <Modal v-model:visible="visible" :title="'选择'" @ok="handleOk" :afterClose="close" :destroyOnClose="true" width="800px">
        <Spin :spinning="loading">
            <div class="content"></div>
        </Spin>
    </Modal>
</template>
<script lang="ts">
import { defineComponent, ref, Ref, onMounted } from "vue"
import { Modal, Empty, Spin, message } from "ant-design-vue"
import api from "@/api"
import * as I from "@/api/interface/index"

export default defineComponent({
    components: { Modal, Spin },
    props: {
        msg: String,
        title: String
    },
    setup(props) {
        const visible = ref(false)
        const doClose = ref(() => null)
        const success: Ref<(files: Array<I.file.baseRow>) => void> = ref(() => null)
        const close = () => {
            doClose.value()
        }
        // const { loading, list, loadData } = useListPageHook({ api: api.fileApi.fileList })
        const loading = ref(false)
        const total: Ref<number | undefined> = ref(0)
        const list: Ref<Array<I.file.baseRow> | undefined> = ref([])
        onMounted(() => {
            setTimeout(() => {
                loadData()
            })
        })

        const loadData = () => {
            loading.value = true
            api.fileApi
                .fileList()
                .then((res) => {
                    list.value = res?.result?.rows
                    total.value = res?.result?.count
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
            loadData,
            onUploadSuccess,
            simpleImage: Empty.PRESENTED_IMAGE_SIMPLE,
            selectList,
            handleOk,
            success
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
