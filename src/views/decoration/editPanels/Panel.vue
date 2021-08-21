@@ -0,0 +1,108 @@
<template>
    <transition name="fade">
        <div class="element-panel" v-if="visible" ref="panel" @mousedown.stop>
            <div class="panel-header" @mousedown="onMousedown">
                <!-- <el-button class="btn-close" icon="el-icon-close" type="text" @click="close"></el-button> -->
                <div class="title">{{ title }}</div>
            </div>
            <div class="panel-body"><slot></slot></div>
        </div>
    </transition>
</template>
<script lang="ts">
import * as Utils from '@/utils';
import { ref } from 'vue';
export default {
    components: {},
    props: {
        visible: {
            type: Boolean,
            default: false
        },
        title: {
            type: String,
            default: '元素编辑'
        }
    },
    setup(props) {
        const dragEvent = ref({
            startX: 0,
            startY: 0,
            moveable: false,
            startL: 0,
            startT: 0
        });
        const panelStyle = ref({
            top: '100px',
            left: document.body.clientWidth - 320 - 10 + 'px'
        });
        const close = () => {
            $emit('update:visible', false);
        };
        const _onResize = () => {
            var w = document.body.clientWidth;
            var l = parseFloat(panelStyle.left);
            if (w - l <= 50) {
                panelStyle.left = w - 320 - 10 + 'px';
            }
        };
        const onMousedown = e => {
            dragEvent.moveable = true;
            dragEvent.startX = e.pageX;
            dragEvent.startY = e.pageY;
            dragEvent.currentIndex = e.currentTarget.getAttribute('data-index');

            dragEvent.startL = parseFloat(panelStyle.left || 0);
            dragEvent.startT = parseFloat(panelStyle.top || 0);
            document.addEventListener('mousemove', onMousemove);
            document.addEventListener('mouseup', onMouseup);
        };
        const onMousemove = e => {
            if (!dragEvent.moveable) return;
            e.preventDefault();
            dragEvent.endX = e.pageX;
            dragEvent.endY = e.pageY;

            panelStyle.left = dragEvent.startL + dragEvent.endX - dragEvent.startX + 'px';
            panelStyle.top = dragEvent.startT + dragEvent.endY - dragEvent.startY + 'px';
        };
        const onMouseup = () => {
            dragEvent.moveable = false;
            document.removeEventListener('mousemove', onMousemove);
        };
        return {
            dragEvent,
            panelStyle,
            onMouseup,
            onMousemove,
            onMousedown,
            close
        };
    }
};
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
    position: fixed;
    background: #fff;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
    z-index: 60;
    width: 320px;
    top: 55px;
    bottom: 0;
    right: 0;
    .panel-header {
        padding: 10px 15px;
        background: #eee;
        cursor: move;

        .btn-close {
            float: right;
        }
    }

    .panel-body {
        overflow: auto;
        padding: 0 15px;
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
