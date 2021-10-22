<template>
    <div class="bg-img">
        <FileUpload v-model="model"> </FileUpload>
        <div class="bg-img-remove color-red" v-if="model" @click="remove"><DeleteOutlined /></div>
    </div>
</template>
<script lang="ts">
import FileUpload from "@/components/upload/FileUpload.vue"
import { defineComponent, ref, watch } from "vue"
import { DeleteOutlined } from "@ant-design/icons-vue"
export default defineComponent({
    components: { FileUpload, DeleteOutlined },
    props: {
        modelValue: {
            type: String,
            default: ""
        }
    },
    setup(props, context) {
        const model = ref("")

        watch(model, (val: string) => {
            context.emit("update:modelValue", "url(" + val + ")")
            context.emit("change", val)
        })
        const remove = () => {
            model.value = ""
        }
        return {
            model,
            remove
        }
    }
})
</script>
<style scoped lang="scss">
.bg-img {
    width: 100px;
    height: 100px;
    position: relative;

    :deep(.file-upload) {
        width: 100px;
        height: 100px;
    }
    .bg-img-remove {
        position: absolute;
        top: 0;
        right: 0;
        display: none;
        cursor: pointer;
    }
    &:hover {
        .bg-img-remove {
            display: block;
        }
    }
}
</style>
