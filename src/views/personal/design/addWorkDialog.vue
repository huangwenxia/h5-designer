<template>
    <Modal v-model:visible="visible" :title="formState.id ? '编辑' : '添加'" @ok="handleOk" :afterClose="close" :destroyOnClose="true" width="600px">
        <Spin :spinning="loading">
            <a-form ref="formRef" :model="formState" :rules="rules" @finish="onSubmit" :label-col="{ span: 4 }">
                <a-form-item name="title" label="标题">
                    <a-input placeholder="请输入标题" v-model:value="formState.title" size="large">
                        <template #prefix>
                            <component :is="'UserOutlined'"></component>
                        </template>
                    </a-input>
                </a-form-item>
                <a-form-item name="desc" label="描述">
                    <a-input placeholder="请输入描述" v-model:value="formState.desc" size="large">
                        <template #prefix>
                            <component :is="'UserOutlined'"></component>
                        </template>
                    </a-input>
                </a-form-item>
                <a-form-item name="cover" label="截图">
                    <FileUpload v-model="formState.cover" />
                </a-form-item>
            </a-form>
        </Spin>
    </Modal>
</template>
<script lang="ts">
import { defineComponent, ref, Ref } from "vue"
import { Modal, Spin, message } from "ant-design-vue"
import api from "@/api"
import * as I from "@/api/interface/index"
import FileUpload from "@/components/upload/FileUpload.vue"
import { UserOutlined } from "@ant-design/icons-vue"
export default defineComponent({
    components: { Modal, Spin, FileUpload ,UserOutlined},
    setup(props, context) {
        const visible = ref(false)
        const loading = ref(false)
        const formRef = ref()
        const formState: Ref<I.scene.saveparam> = ref({
            title: "",
            desc: "",
            cover: ""
        })
        const rules = ref({
            title: [{ required: true, message: "标题不能为空", trigger: "blur" }]
        })
        const close = () => {
            visible.value = false
        }
        const handleOk = () => {
            formRef.value.validate().then(() => {
                loading.value = true
                api.sceneApi
                    .save(formState.value)
                    .then(() => {
                        message.success("提交成功")
                        context.emit("refresh")
                        close()
                    })
                    .finally(() => {
                        loading.value = false
                    })
            })
        }
        const open = () => {
            visible.value = true
        }
        return {
            visible,
            handleOk,
            close,
            formState,
            open,
            loading,
            rules,
            formRef
        }
    }
})
</script>
