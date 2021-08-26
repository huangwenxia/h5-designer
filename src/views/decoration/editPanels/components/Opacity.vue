<template>
    <div class="edit-item">
        <span class="label"> 透明度： </span>
        <div class="value">
            <a-row>
                <a-col :span="10">
                    <a-slider v-model:value="inputValue" :min="0" @change="inputChenge" :max="100" />
                </a-col>
                <a-col :span="2">
                    <a-input-number v-model:value="inputValue" @change="inputChenge" :min="0" :max="100" style="margin-left: 10px" />
                </a-col>
            </a-row>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, ref, Ref, computed } from "vue"
import { ElementsType } from "@/store/page"
import { useStore } from "vuex"

export default defineComponent({
    setup() {
        const store = useStore()
        const data: Ref<ElementsType> = ref(computed(() => store.state.page.currentElement))
        const inputValue = ref(0)
        const inputChenge = () => {
            data.value.style.opacity = (100 - inputValue.value) / 100
        }
        return {
            data,
            inputValue,
            inputChenge
        }
    }
})
</script>
