<template>
    <div>
        <div class="edit-item">
            <span class="label"> 边框样式 </span>
            <div class="value">
                <a-select ref="select" v-model:value="data.style.borderStyle" style="width: 188px" @change="handleChange">
                    <a-select-option value="">无</a-select-option>
                    <a-select-option value="solid">——————</a-select-option>
                    <a-select-option value="dashed">---------------</a-select-option>
                    <a-select-option value="dotted">···············</a-select-option>
                </a-select>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, ref, Ref, computed } from "vue"
import { useStore } from "vuex"
import { ElementsType } from "@/store/page"

export default defineComponent({
    setup() {
        const store = useStore()
        const data: Ref<ElementsType> = ref(computed(() => store.state.page.currentElement))
        const handleChange = () => {
            if (!data.value.style.borderStyle) {
                delete data.value.style.borderStyle
            }
        }
        return {
            data,
            handleChange
        }
    }
})
</script>
<style lang="sass" scoped></style>
