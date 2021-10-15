<template>
    <div class="set-page">
        <Tabs :list="tabList">
            <template v-slot:背景设置>背景设置 </template>
        </Tabs>
    </div>
</template>
<script lang="ts">
import { defineComponent, computed, Ref, ref } from "vue"
import Tabs from "../../editPanels/Tabs.vue"
interface valueType {
    label: string
}
type MenuType = Array<valueType>
export default defineComponent({
    components: { Tabs },
    setup() {
        const tabList: Ref<MenuType> = ref([{ label: "背景设置" }])
        return {
            tabList
        }
    }
})
</script>
<style lang="scss" scoped>
.set-page {
    padding: 20px 0;
}
</style>
