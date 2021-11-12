<template>
    <div class="video-list" v-if="list.length">
        <div class="item" v-for="(item, i) in list" :key="i" :class="{ active: model.some((a) => a.id == item.id) }" @click="select(item)">
            <video width="320" height="240" :id="'Video_' + item.id" controls :src="item.url" preload="auto"></video>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, PropType, ref, watch } from "vue"

import * as I from "@/api/interface"
interface Video extends I.file.baseRow {
    status?: string
}
const Props = {
    list: {
        type: Array as PropType<Array<Video>>,
        default() {
            return []
        }
    },
    modelValue: {
        type: Array as PropType<Array<I.file.baseRow>>,
        default() {
            return []
        }
    }
}
export default defineComponent({
    props: Props,
    setup(props, context) {
        const model = ref(props.modelValue)
        watch(
            () => props.modelValue,
            (val) => {
                model.value = val
            }
        )
        watch(model, (val) => {
            context.emit("update:modelValue", val)
        })
        const select = (data: I.file.baseRow) => {
            model.value = [data]
        }
        return { model, select }
    }
})
</script>
<style scoped lang="scss">
.video-list {
    height: 540px;
    .item {
        float: left;
        margin: 0 20px 20px 0;
        border: 1px solid transparent;
        cursor: pointer;
        overflow: hidden;
        padding: 2px;
        width: 160px;
        &.active {
            border-color: #1890ff;
        }
        .name {
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
        }
    }
    &:after {
        content: "";
        display: block;
        clear: both;
    }
}
</style>
