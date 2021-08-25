<template>
    <div class="panel" ref="panel">
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
.panel-header {
    line-height: 32px;
    padding: 5px 0 5px 10px;
    background-color: #fff;
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
    position: absolute;
    width: 100%;
    // top: 50px;
    // bottom: 0;
    background-color: #fff;

    /deep/ {
        .el-input__inner {
            padding: 0 5px;
        }
        .el-form-item {
            margin-bottom: 10px;
        }
    }
}
</style>
