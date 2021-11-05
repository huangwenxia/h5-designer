<template>
    <div class="audio-list" v-if="list.length">
        <div class="item" v-for="(item, i) in list" :key="i" :class="{ active: model.some((a) => a.id == item.id) }" @click="select(item)">
            <audio :id="'Music_' + item.id" controls v-show="false">
                <source :src="item.url" />
            </audio>
            <img :src="require('@/assets/images/music.jpg')" />
            <span class="name" :title="item.name">{{ item.name }}</span>
            <component :is="item.status" @click.stop="onMusic(item)" />
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, PropType, ref, watch } from "vue"
import { PauseOutlined, PlaySquareOutlined } from "@ant-design/icons-vue"
import * as I from "@/api/interface"
interface Music extends I.file.baseRow {
    status?: string
}
const Props = {
    list: {
        type: Array as PropType<Array<Music>>,
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
    components: { PauseOutlined, PlaySquareOutlined },
    props: Props,

    setup(props, context) {
        const model = ref(props.modelValue)
        props.list?.map((item) => (item.status = "PauseOutlined"))
        const onMusic = ref((item: Music) => {
            const Audio = document.getElementById("Music_" + item.id) as HTMLAudioElement
            item.status = item.status == "PauseOutlined" ? "PlaySquareOutlined" : "PauseOutlined"
            if (item.status == "PauseOutlined") {
                Audio.pause()
            } else {
                Audio.play()
            }
        })
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
        return { model, select, onMusic }
    }
})
</script>
<style scoped lang="scss">
.audio-list {
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
