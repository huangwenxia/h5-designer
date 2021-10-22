<template>
    <div class="tabs">
        <a-tabs v-model:activeKey="activeKey">
            <a-tab-pane :key="index + 1" :tab="item.label" v-for="(item, index) in list">
                <slot :name="item.label"></slot>
            </a-tab-pane>
        </a-tabs>
    </div>
</template>
<script lang="ts">
import { defineComponent, ref, PropType } from "vue"
interface valueType {
    label: string
}
type MenuType = Array<valueType>
const PropsType = {
    list: {
        type: Array as PropType<MenuType>,
        default: []
    }
}
export default defineComponent({
    props: PropsType,
    setup() {
        let activeKey = ref(1)
        return {
            activeKey
        }
    }
})
</script>
<style lang="scss" scoped>
.tabs {
    :deep(.ant-tabs-tabpane) {
        height: calc(100vh - 170px);
        overflow-y: auto;
        // overflow-x: hidden;
    }
}
</style>
