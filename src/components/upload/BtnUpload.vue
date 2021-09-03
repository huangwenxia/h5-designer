<template>
    <div class="btn-upload-ceil">
        <div class="btn-primary">
            <a-space v-if="form.loading">
                <LoadingOutlined />
                <span>上传中...</span>
            </a-space>
            <span v-else>上传</span>
            <input type="file" @change="onUpload" />
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent } from "vue"
import { useGlobalHook } from "@/utils/useGlobalHook"
import { reactive } from "vue"
import { LoadingOutlined } from "@ant-design/icons-vue"
export interface FormType {
    loading: boolean
}
export default defineComponent({
    name: "BtnUpload",
    components: { LoadingOutlined },
    setup() {
        const { api, message } = useGlobalHook()
        const form = reactive<FormType>({
            loading: false
        })
        // const onUpload = (event: Event) => {
        //     // const file = event.currentTarget.files[0]
        //     // let file = (<HTMLInputElement>e.target).files[0];
        //     // const target = event.target as HTMLInputElement
        //     // const file = target.files[0]
        //     if (!file) return
        //     const formData = new FormData()
        //     formData.append("files", file)
        //     api.fileApi
        //         .upload(formData)
        //         .then(() => {
        //             form.loading = false
        //             message.info({
        //                 type: "success",
        //                 content: "上传成功",
        //                 duration: 2000
        //             })
        //         })
        //         .catch(() => {
        //             form.loading = false
        //         })
        // }
        // return { onUpload, form }
    }
})
</script>
<style lang="scss" scoped>
.btn-upload-ceil {
    display: inline-block;
    color: rgba(0, 0, 0, 0.85);
    font-size: 14px;
    .btn-primary {
        line-height: 1.5715;
        position: relative;
        display: inline-block;
        font-weight: 400;
        white-space: nowrap;
        text-align: center;
        background: #1890ff;
        border: 1px solid #1890ff;
        cursor: pointer;
        user-select: none;
        height: 32px;
        padding: 4px 15px;
        font-size: 14px;
        border-radius: 2px;
        color: #fff;
    }
    input {
        display: block;
        position: absolute;
        cursor: pointer;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        opacity: 0;
        font-size: 0;
    }
}
</style>
