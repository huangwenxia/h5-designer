<template>
    <div class="edit-panel">
        <component :is="map[currentElement && currentElement.type]"></component>
    </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue"
import TextPanel from "./TextPanel.vue"
import { useStore } from "vuex"

const PropsType = {
    type: {
        type: String,
        default: ""
    }
}

export default defineComponent({
    props: PropsType,
    setup() {
        const store = useStore()
        const map = {
            text: TextPanel
        }
        const currentElement = computed(() => store.getters.getCurrentElement)
        // console.log(elements, "elements")
        return {
            map,
            currentElement
        }
    }
})
</script>

<style scoped lang="scss"></style>
