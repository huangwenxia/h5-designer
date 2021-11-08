<template>
    <div class="audio-list" v-if="list.length">
        <div class="item" v-for="(item, i) in list" :key="i" :class="{ active: model.some((a) => a.id == item.id) }" @click="select(item)">
            <audio :id="'Music_' + item.id" controls v-show="false" :src="item.url" preload="auto"></audio>
            <img :src="require('@/assets/images/music.jpg')" />
            <span class="name" :title="item.name">{{ item.name }}</span>
            <component :is="payMap[item.id] ? 'PauseOutlined' : 'PlaySquareOutlined'" @click.stop="onMusic(item)" />
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, PropType, Ref, ref, watch } from "vue"
import { PauseOutlined, PlaySquareOutlined } from "@ant-design/icons-vue"

import * as I from "@/api/interface"
interface Music extends I.file.baseRow {
    status?: string
}
interface PayMap {
    [key: string]: boolean
}
interface CurrAudio {
    audio: HTMLAudioElement | null
    id: string
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
        const payMap: Ref<PayMap> = ref({})
        const currAudio: Ref<CurrAudio> = ref({ audio: null, id: "" })

        const onMusic = async (item: Music) => {
            const Audio = document.getElementById("Music_" + item.id) as HTMLAudioElement
            payMap.value[item.id] = !payMap.value[item.id]
            let currPromise = await Audio.play()
                .then(() => {
                    return true
                })
                .catch((e) => {
                    console.error(e)
                    return false
                })
            if (currAudio.value.audio && currAudio.value.id != item.id + "") {
                payMap.value[currAudio.value.id] = false
                currAudio.value.audio.pause()
            }
            if (currPromise) {
                payMap.value[item.id] && Audio.play()
                !payMap.value[item.id] && Audio.pause()
                currAudio.value.audio = Audio
                currAudio.value.id = item.id + ""
            } else {
            }
        }
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
        return { model, select, onMusic, payMap }
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
