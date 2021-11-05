<template>
    <div class="btn-upload-ceil">
        <div class="btn-primary">
            <a-space v-if="form.percent">
                <LoadingOutlined />
                <span>上传中...</span>
            </a-space>
            <span v-else>上传</span>
            <input type="file" :accept="acceptType + '/*'" @change="onUpload" :disabled="form.percent" />
            <div v-if="form.percent" class="bar" :style="{ width: form.percent + '%' }">{{ form.percent + " %" }}</div>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent } from "vue"
import { useGlobalHook } from "@/hooks/useGlobalHook"
import { reactive } from "vue"
import { LoadingOutlined } from "@ant-design/icons-vue"
import * as I from "@/api/interface"
export interface FormType {
    percent: number
}
export default defineComponent({
    name: "BtnUpload",
    props: {
        acceptType: {
            type: String,
            default() {
                return "image"
            }
        }
    },
    components: { LoadingOutlined },
    setup(props, context) {
        const { api, message } = useGlobalHook()
        const form = reactive<FormType>({
            percent: 0
        })
        const onUpload = (event: Event) => {
            let target = event.target as HTMLInputElement
            const file = target.files && target.files[0]
            if (!file) return
            const formData = new FormData()
            formData.append("files", file)

            const onUploadProgress = (progressEvent = { loaded: 0, total: 0 }) => {
                //hwx:ts校验存在any，所以加上初始值
                form.percent = (progressEvent.loaded / progressEvent.total) * 100
            }
            api.fileApi
                .upload(formData, onUploadProgress)
                .then((res) => {
                    target.value = "" //同一个 input 选择同一张图片 不会触发 onchange事件
                    setTimeout(() => {
                        if (form.percent == 100) {
                            message.info({
                                type: "success",
                                content: "上传成功"
                            })
                            form.percent = 0
                        }
                    })
                    context.emit("success", res)
                })
                .catch(() => {
                    target.value = ""
                    form.percent = 0
                })
        }
        return { onUpload, form }
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
        .bar {
            position: absolute;
            left: 0;
            right: 0;
            bottom: -1;
            font-size: 10px;
            height: 4px;
            background-color: #52c41a;
        }
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
