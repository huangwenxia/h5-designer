<template>
    <div class="video-list">
        <div class="item" v-for="(item, i) in list" :key="i" :class="{ active: model.some((a) => a.id == item.id) }" @click="select(item)">
            <div class="item-video">
                <VideoView v-model="item.url" :data="item"></VideoView>
            </div>

            <div class="name" :title="item.name">{{ item.name }}</div>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, PropType, ref, watch } from "vue"
import * as I from "@/api/interface/index"
import VideoView from "../../VideoView.vue"

const Props = {
    list: {
        type: Array as PropType<Array<I.file.baseRow>>,
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
    components: { VideoView },
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
        .item-video {
            position: relative;
            width: 160px;
            height: 160px;
        }
    }
    &:after {
        content: "";
        display: block;
        clear: both;
    }
}
</style>
