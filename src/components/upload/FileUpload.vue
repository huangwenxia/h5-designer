<template>
    <div class="file-upload" @click="select">
        <div class="img" :style="{ backgroundImage: 'url(' + model + ')' }" v-if="model"></div>
        <div class="icon-plus" v-if="!model"></div>
    </div>
</template>
<script lang="ts">
import { defineComponent, ref, watch } from "vue"
import FileService from "@/components/FileService"
export default defineComponent({
    props: {
        modelValue: {
            type: String,
            default: ""
        }
    },
    setup(props, context) {
        const model = ref("")
        watch(model, (val) => {
            context.emit("update:modelValue", val)
        })
        watch(
            () => props.modelValue,
            (val) => {
                model.value = val
            }
        )
        const select = () => {
            FileService({
                success: (files) => {
                    model.value = files[0].url
                }
            })
        }
        return {
            model,
            select
        }
    }
})
</script>

<style scoped lang="scss">
.file-upload {
    display: inline-block;
    width: 120px;
    height: 120px;
    border: 1px dashed $color-border;
    border-radius: $radius;
    position: relative;
    cursor: pointer;
    .icon-plus {
        width: 1em;
        height: 1em;
        display: inline-block;
        font-size: 50px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        &:before,
        &:after {
            width: 100%;
            height: 2px;
            content: "";
            display: block;
            background: $color-border;
            position: absolute;
            top: 50%;
            left: 0;
            margin-top: -1px;
        }
        &:after {
            transform: rotate(90deg);
        }
    }
    .img {
        position: absolute;
        width: 100%;
        height: 100%;
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
        top: 0;
        left: 0;
    }
    &:hover {
        border-color: $color-primary;
        .icon-plus {
            &:before,
            &:after {
                background: $color-primary;
            }
        }
    }
}
</style>
