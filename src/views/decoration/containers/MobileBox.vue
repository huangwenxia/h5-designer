<template>
    <div class="mobile-box">
        <div class="elements" v-for="(item, index) in elements" :class="{ active: currentId == item.id }" :key="index" :style="item.style" @click="setCurrent(item.id)">
            <div v-if="item.type == 'text'">
                {{ item.text }}
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue"
import { useStore } from "vuex"

export default defineComponent({
    setup() {
        const store = useStore()
        const elements = computed(() => store.state.page.elements)
        const setCurrent = (id: string) => {
            store.commit("setCurrent", id)
        }
        const currentId = computed(() => store.state.page.currentElementsId)
        return {
            elements,
            setCurrent,
            currentId
        }
    }
})
</script>

<style lang="scss" scoped>
.mobile-box {
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    top: 0;
    margin-top: 114px;
    box-shadow: 0 0 5px rbga(0, 0, 0, 0.05);
    border: 1px solid #eee;
    display: inline-block;
    overflow: hidden;
    width: 350px;
    min-height: 600px;
    background-color: #fff;
    .elements {
        position: absolute;
        &.active {
            border: 1px dashed #1593ff;
        }
    }
}
</style>
