<template>
    <div class="bg-color">
        <ColorPicker v-model="model" @change="onChange"></ColorPicker>
    </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue"
import { ColorPicker } from "@tucy/vue3-color"
export default defineComponent({
    components: { ColorPicker },
    props: {
        modelValue: {
            type: String,
            default: ""
        }
    },
    setup(props, context) {
        const model = ref(props.modelValue)
        const onChange = () => {
            context.emit("update:modelValue", model.value)
            context.emit("change", model.value)
        }
        return {
            model,
            onChange
        }
    }
})
</script>
