<template>
    <div class="bg-img">
        <FileUpload v-model="model"></FileUpload>
    </div>
</template>
<script lang="ts">
import FileUpload from "@/components/upload/FileUpload.vue"
import { defineComponent, ref, watch } from "vue"
export default defineComponent({
    components: { FileUpload },
    props: {
        modelValue: {
            type: String,
            default: ""
        }
    },
    setup(props, context) {
        const model = ref("")

        watch(model, (val: string) => {
            console.log(val, "s")
            context.emit("update:modelValue", "url(" + val + ")")
            context.emit("change", val)
        })
        return {
            model
        }
    }
})
</script>
