<template>
    <div class="decoration">
        <div class="decoration-header">
            <div class="logo"><span class="txt">H5设计平台</span></div>
            <ul class="header-list">
                <li class="header-item" :class="{ active: index == menutab }" @click="menutab = index" v-for="(item, index) in menuArray" :key="index">
                    <component :is="item.icon" class="icon"></component>
                    <div>{{ item.name }}</div>
                </li>
                <li class="item item-active" :style="{ transform: 'translateY(' + menutab * 100 + '%)' }"><div class="active-border"></div></li>
            </ul>
        </div>
        <SiderBar></SiderBar>
        <MobileBox></MobileBox>
    </div>
</template>

<script lang="ts">
import SiderBar from './containers/SiderBar/index.vue';
import MobileBox from './containers/MobileBox.vue';
import { defineComponent, ref } from 'vue';
import { FontSizeOutlined, PictureOutlined, PlaySquareOutlined } from '@ant-design/icons-vue';
export default defineComponent({
    components: { SiderBar, MobileBox, FontSizeOutlined, PictureOutlined, PlaySquareOutlined },
    setup() {
        const menuArray = ref([
            { name: '文本', icon: 'FontSizeOutlined' },
            { name: '图片', icon: 'PictureOutlined' },
            { name: '视频', icon: 'PlaySquareOutlined' },
            { name: '音乐', icon: 'PlaySquareOutlined' }
        ]);
        return {
            menuArray
        };
    }
});
</script>

<style scoped lang="scss">
.decoration {
    background: #f2f2f2;
    padding-top: 60px;
    min-height: 100vh;
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
                display: inline-block;
                vertical-align: top;
                line-height: 1.5;
                padding:10px 20px;
                font-weight: bold;
                color: #464646;
                text-align: center;
                .icon{
                    font-size: 20px;
                }
                &:hover{
                    background-color: #1593FF;
                    color: #fff;
                }
            }
        }
    }
}
</style>
