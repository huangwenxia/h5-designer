<template>
    <div class="my-works">
        <a-tabs v-model:activeKey="activeKey">
            <a-tab-pane key="1" tab="图片">12312</a-tab-pane>
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
import { defineComponent, ref } from "vue"
import BtnUpload from "@/components/upload/BtnUpload.vue"
export default defineComponent({
    name: "material",
    components: { BtnUpload },
    setup() {
        return {
            activeKey: ref("1")
        }
    }
})
</script>
