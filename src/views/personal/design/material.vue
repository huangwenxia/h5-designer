<template>
    <div class="my-works">
        <a-tabs v-model:activeKey="activeKey">
            <a-tab-pane key="1" tab="图片">12312</a-tab-pane>
            <a-tab-pane key="2" tab="视屏">Content of Tab Pane 2</a-tab-pane>
            <a-tab-pane key="3" tab="音乐">Content of Tab Pane 3</a-tab-pane>
            <template #tabBarExtraContent>
                素材空间
                <a-upload :customRequest="onUpload">
                    <a-button type="primary">上传</a-button>
                </a-upload>
            </template>
        </a-tabs>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue"
import { useFileUploadEffect } from "@/views/personal/design/hooks/useFileUploadEffect"

export default defineComponent({
    name: "MyWorks",
    components: {},
    setup() {
        const { loading, onUpload } = useFileUploadEffect()
        return {
            activeKey: ref("1"),
            loading,
            onUpload
        }
    }
})
</script>
