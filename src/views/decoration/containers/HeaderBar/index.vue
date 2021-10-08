<template>
    <div class="decoration-header">
        <div class="logo"><span class="txt">H5设计平台</span></div>
        <ul class="header-list">
            <li class="header-item" @click="headerItem(item)" v-for="(item, index) in menuArray" :key="index">
                <component :is="item.icon" class="icon"></component>
                <div>{{ item.name }}</div>
            </li>
            <!-- <li class="item item-active" :style="{ transform: 'translateY(' + menutab * 100 + '%)' }"><div class="active-border"></div></li> -->
        </ul>
        <div class="controls">
            <a-button type="primary" shape="round" @click="save">保存</a-button>
            <a-button type="primary" :danger="true" shape="round" @click="publish">发布</a-button>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent } from "vue"
import useMenuHook from "./useMenuHook"
import useSaveHook from "./useSaveHook"
import { FontSizeOutlined, PictureOutlined, PlaySquareOutlined } from "@ant-design/icons-vue"

export default defineComponent({
    components: { FontSizeOutlined, PictureOutlined, PlaySquareOutlined },
    setup() {
        const { menuArray, headerItem } = useMenuHook()
        const { save, publish } = useSaveHook()

        return {
            menuArray,
            headerItem,
            save,
            publish
        }
    }
})
</script>
<style scoped lang="scss">
.decoration-header {
    height: 60px;
    line-height: 60px;
    padding: 0 20px;
    border-bottom: 1px solid #ddd;
    position: fixed;
    top: 0;
    width: 100%;
    top: 0;
    z-index: 99;
    background: #fff;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
    .logo {
        float: left;
        .txt {
            margin-left: 30px;
            color: #666;
        }
    }
    .header-list {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        .header-item {
            height: 60px;
            display: inline-block;
            vertical-align: top;
            line-height: 1.5;
            padding: 10px 20px;
            font-weight: bold;
            color: #464646;
            text-align: center;
            cursor: pointer;
            .icon {
                font-size: 20px;
            }
            &:hover {
                background-color: #1593ff;
                color: #fff;
            }
        }
    }
    .controls {
        float: right;
        .ant-btn {
            margin-left: 10px;
        }
    }
}
</style>
