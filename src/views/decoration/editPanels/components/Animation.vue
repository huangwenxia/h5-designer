<template>
    <div class="animation">
        <div class="button">
            <a-button type="primary" @click="addition">
                <template #icon><PlusOutlined /></template>添加动画
            </a-button>
        </div>
        <a-collapse v-model:activeKey="activeKey">
            <a-collapse-panel :key="index + 1" :disabled="false" v-for="(item, index) in data.animateList">
                <template v-slot:header>
                    <div class="animation-collapse-header">
                        动画{{ index + 1 }}
                        <a-select ref="select" v-model:value="item.animateName" style="width: 120px" @change="handleChange">
                            <a-select-option :value="a.animateName" v-for="(a, index) in list" :key="index">{{ a.label }}</a-select-option>
                        </a-select>
                    </div>
                </template>
                <div class="animation-item" :key="index">
                    <component :is="item.icon"></component>
                    <div>
                        {{ item.label }}
                    </div>
                </div>
            </a-collapse-panel>
        </a-collapse>
    </div>
</template>
<script lang="ts">
import { defineComponent, ref, Ref, computed } from "vue"
import { AmazonOutlined, PlusOutlined } from "@ant-design/icons-vue"
import { useStore } from "vuex"
import { ElementsType, AnimateType } from "@/store/page"
import { deepClone, genNonDuplicateID } from "@/utils/index"

type AnimateListType = Array<AnimateType>

export default defineComponent({
    components: { AmazonOutlined, PlusOutlined },
    setup() {
        const store = useStore()
        const data: Ref<ElementsType> = ref(computed(() => store.state.page.currentElement))
        const list: AnimateListType = [
            { animateName: "animate__bounce", label: "弹跳", icon: "AmazonOutlined" },
            { animateName: "animate__flash", label: "闪光", icon: "AmazonOutlined" },
            { animateName: "animate__pulse", label: "脉冲", icon: "AmazonOutlined" }
        ]
        const selectValue = ref("")
        const activeKey: Ref<Array<number>> = ref([])
        activeKey.value = data.value.animateList.map((a, i) => {
            return i
        })
        const handleChange = () => {
            console.log(data.value.animateList)
        }
        const addition = () => {
            let opt = deepClone(list[0])
            opt.id = "animat_" + genNonDuplicateID(6)
            data.value.animateList.push(opt)
            activeKey.value = data.value.animateList.map((a, i) => {
                return i
            })
        }
        return {
            list,
            data,
            handleChange,
            addition,
            activeKey,
            selectValue
        }
    }
})
</script>
<style lang="scss" scoped>
.animation {
    padding: 10px 20px;
    .animation-item {
        display: inline-block;
        padding: 15px 20px;
        text-align: center;
        color: #959fa8;
        font-weight: bold;
        cursor: pointer;
        &:hover {
            color: #1593ff;
        }
    }
}
</style>
