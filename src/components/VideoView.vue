<template>
    <div class="show-video" @click="handiePlay()">
        <video :src="model" ref="videoRef" :poster="poster" :controls="isPlay" :loop="loop"></video>
        <!-- <PauseCircleOutlined class="icon icon-play" v-if="isPlay" @click="handiePause()" /> -->
        <PlayCircleOutlined class="icon icon-pause" v-if="!isPlay" />
    </div>
</template>
<script lang="ts">
import { defineComponent, watch, ref, Ref, onMounted } from "vue"
import { PlayCircleOutlined } from "@ant-design/icons-vue"

export default defineComponent({
    components: { PlayCircleOutlined },

    props: {
        modelValue: {
            type: String,
            default: ""
        },
        poster: {
            type: String,
            default: ""
        },
        loop: {
            type: Boolean,
            default: false
        }
    },
    setup(props) {
        const model: Ref<string> = ref(props.modelValue)
        const isPlay: Ref<boolean> = ref(false)
        const videoRef = ref()
        watch(
            () => props.modelValue,
            (val) => {
                model.value = val
            }
        )
        const handiePlay = () => {
            if (isPlay.value) return
            let dom = videoRef.value
            dom && dom.play()
            isPlay.value = true
        }

        onMounted(() => {
            let dom = videoRef.value
            dom?.addEventListener("pause", () => {
                isPlay.value = false
            })
        })
        return { model, isPlay, handiePlay, videoRef }
    }
})
</script>
<style scoped lang="scss">
.show-video {
    height: 100%;
    margin: 0 auto;
    width: 100%;
    position: relative;
    video {
        height: 100%;
        width: 100%;
    }
    .icon {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        font-size: 50px;
        color: #fff;
        cursor: pointer;
        opacity: 0;
        transition: all 0.4s;
    }
    &:hover {
        .icon {
            opacity: 1;
        }
    }
}
</style>
