<template>
    <transition name="fade">
        <div class="element-panel" v-if="currentElement && currentElement.id" ref="panel">
            <div class="panel-header">
                <div class="title">{{ title }}</div>
                <a-button type="text" class="btn-close" shape="circle" :size="size">
                    <template #icon><CloseOutlined /> </template>
                </a-button>
            </div>
            <div class="panel-body">
                <slot></slot>
            </div>
        </div>
    </transition>
</template>
<script lang="ts">
import { useStore } from "vuex"
import { defineComponent, computed } from "vue"
import { CloseOutlined } from "@ant-design/icons-vue"

const PropTypes = {
    title: {
        type: String,
        default: ""
    }
}
export default defineComponent({
    props: PropTypes,
    components: { CloseOutlined },
    setup() {
        const store = useStore()
        const currentElement = computed(() => store.getters.getCurrentElement)
        return {
            currentElement
        }
    }
})
</script>
<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
    transition: transform 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    transform: translateX(100%);
}
.element-panel {
    border: 1px solid red;
    position: fixed;
    background: #fff;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
    z-index: 60;
    width: 320px;
    top: 60px;
    bottom: 0;
    right: 0;
    .panel-header {
        line-height: 32px;
        padding: 5px 0 5px 10px;
        .title {
            display: inline-block;
        }
        .btn-close {
            float: right;
            color: black;
        }
    }

    .panel-body {
        overflow: auto;
        // padding: 0 15px;
        position: absolute;
        width: 100%;
        top: 50px;
        bottom: 0;
        /deep/ {
            .el-input__inner {
                padding: 0 5px;
            }
            .el-form-item {
                margin-bottom: 10px;
            }
        }
    }
}
</style>
