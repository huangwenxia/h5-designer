<template>
    <div class="edit-panel" id="edit-panel-content" @mousedown.stop>
        <div class="element-panel" :class="{ 'element-active': currentElement && currentElement.id }" ref="panel">
            <component :is="map[currentElement && currentElement.type]"></component>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue"
import TextPanel from "./TextPanel.vue"
import ImagePanel from "./ImagePanel.vue"
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
            text: TextPanel,
            image: ImagePanel
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

<style scoped lang="scss">
.element-panel {
    position: fixed;
    background: #fff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    z-index: 60;
    width: 320px;
    top: 60px;
    bottom: 0;
    right: 0;
    transition: all 0.5s ease;
    transform: translateX(100%);
    &.element-active {
        transform: translateX(0%);
    }
}
</style>
