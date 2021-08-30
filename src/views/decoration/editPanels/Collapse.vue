<template>
    <div class="collapse">
        <a-collapse v-model:activeKey="activeKey" :bordered="false">
            <a-collapse-panel :header="item.label" v-for="item in list" :key="item.label">
                <div>
                    <slot :name="item.label"></slot>
                </div>
            </a-collapse-panel>
        </a-collapse>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, Ref } from "vue"
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
    setup(props) {
        let activeKey: Ref<Array<string>> = ref([props.list[0].label])
        return {
            activeKey
        }
    }
})
</script>
<style scoped lang="scss">
.collapse {
    /deep/.ant-collapse {
        background-color: rgba(0, 0, 0, 0);
        .ant-collapse-item {
            border-bottom: 5px solid #f1f5f9;
            &:last-child {
                border: none;
            }
        }
        .ant-collapse-content {
            overflow: unset;
        }
    }
}
</style>
