<template>
    <div class="animation">
        <div class="button">
            <a-button type="primary" @click="addition">
                <template #icon><PlusOutlined /></template>添加动画
            </a-button>
            <a-button type="primary" @click="preview">
                <template #icon><PlusOutlined /></template>预览动画
            </a-button>
        </div>
        <a-collapse v-model:activeKey="activeKey" expandIconPosition="right">
            <a-collapse-panel :key="item.id" :disabled="false" v-for="(item, index) in data.animateList">
                <template v-slot:header>
                    <div class="animation-collapse-header">
                        <span class="title"> 动画{{ index + 1 }} </span>
                        <a-select ref="select" v-model:value="item.animateName" @click.stop>
                            <a-select-option :value="a.animateName" v-for="(a, index) in list" :key="index">{{ a.label }}</a-select-option>
                        </a-select>
                        <div class="icon-btn">
                            <div class="play" title="播放" @click.stop="play(item)"><CaretRightOutlined /></div>
                            <div class="delete" title="删除" @click.stop="animationDelete(index)"><DeleteFilled /></div>
                        </div>
                    </div>
                </template>
                <div class="animation-item" :key="index">
                    <a-row>
                        <a-col :span="12">
                            <span class="input-label">时间</span>
                            <a-input-number v-model:value="item.duration" :min="0" :step="0.1" />
                            <span class="s">S</span>
                        </a-col>
                        <a-col :span="12">
                            <span class="input-label">延迟</span>
                            <a-input-number v-model:value="item.delay" :min="0" :step="0.1" />
                            <span class="s">S</span>
                        </a-col>
                    </a-row>
                    <a-row>
                        <a-col :span="12">
                            <span class="input-label">次数</span>
                            <a-input-number v-model:value="item.iterationCount" :disabled="item.infinite" :min="1" />
                            <span class="s">次</span>
                        </a-col>
                        <a-col :span="12">
                            <div class="checked">
                                <a-checkbox v-model:checked="item.infinite">循环播放</a-checkbox>
                            </div>
                        </a-col>
                    </a-row>
                </div>
            </a-collapse-panel>
        </a-collapse>
    </div>
</template>
<script lang="ts">
import { defineComponent, ref, Ref, computed } from "vue"
import { PlusOutlined, CaretRightOutlined, DeleteFilled } from "@ant-design/icons-vue"
import { useStore } from "vuex"
import { ElementsType, AnimateType } from "@/store/page"
import { deepClone, genNonDuplicateID, startAnimate } from "@/utils/index"

type AnimateListType = Array<AnimateType>
export default defineComponent({
    components: { PlusOutlined, CaretRightOutlined, DeleteFilled },
    setup() {
        const store = useStore()
        const data: Ref<ElementsType> = ref(computed(() => store.state.page.currentElement))
        const list: AnimateListType = [
            { animateName: "animate__bounce", label: "弹跳" },
            { animateName: "animate__flash", label: "闪光" },
            { animateName: "animate__pulse", label: "脉冲" }
        ]
        const selectValue = ref("")
        const activeKey: Ref<Array<string | undefined>> = ref([])
        activeKey.value = data.value.animateList.map((a) => {
            return a.id
        })
        const addition = () => {
            let opt = deepClone(list[0])
            opt.id = "animat_" + genNonDuplicateID(6)
            opt.duration = 1
            data.value.animateList.push(opt)
            activeKey.value = data.value.animateList.map((a) => {
                return a.id
            })
        }
        const animationDelete = (index: number) => {
            data.value.animateList.splice(index, 1)
        }
        const play = (item: AnimateType) => {
            let opt = deepClone(data.value)
            opt.animateList = [item]
            startAnimate(opt)
        }
        const preview = () => {
            startAnimate(data.value)
        }
        return {
            list,
            data,
            addition,
            activeKey,
            selectValue,
            animationDelete,
            play,
            preview
        }
    }
})
</script>
<style scoped lang="scss">
.animation {
    padding: 10px 0;
    .button {
        padding: 0 20px;
        margin-bottom: 10px;
    }
    :deep(.ant-collapse) {
        border: none;
        .ant-collapse-item {
            border: none;
            .ant-collapse-header {
                padding: 10px 16px;
                border: none;
                background-color: #f2f2f2;
                .title {
                    font-weight: bold;
                }
                .icon-btn {
                    float: right;
                    margin-right: 20px;
                    div {
                        display: inline-block;
                    }
                    .play,
                    .delete {
                        width: 25px;
                        height: 25px;
                        text-align: center;
                        line-height: 25px;
                        border-radius: 50%;
                        color: #868788;
                    }
                    .play {
                        font-size: 16px;
                        &:hover {
                            background-color: #1890ff;
                            color: #fff;
                        }
                    }
                    .delete {
                        &:hover {
                            background-color: red;
                            color: #fff;
                        }
                    }
                }
                .ant-select {
                    width: 100px;
                    margin-left: 30px;
                    .ant-select-selector {
                        height: 25px;
                        line-height: 25px;
                        border: none;
                        border-radius: 20px;
                        .ant-select-selection-search-input {
                            height: 100%;
                        }
                        .ant-select-selection-item {
                            line-height: 25px;
                        }
                    }
                }
            }
            .ant-collapse-content {
                border: none;
            }
        }
    }
    .animation-item {
        :deep(.ant-row) {
            margin-bottom: 10px;
            &:last-child {
                margin-bottom: 0;
            }
            .ant-col-12 {
                position: relative;
                .input-label {
                    padding-right: 10px;
                }
                .ant-input-number {
                    width: calc(100% - 60px);
                    .ant-input-number-handler-wrap {
                        z-index: 10;
                    }
                }
                .s {
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                    right: 30px;
                    color: #ccc;
                    font-size: 12px;
                }
                .checked {
                    border: 1px solid #d9d9d9;
                    padding: 5px;
                    width: 122px;
                    text-align: center;

                    &:hover {
                        border-color: #1890ff;
                        .ant-checkbox-wrapper {
                            color: #1890ff;
                        }
                    }
                }
            }
        }
    }
}
</style>
