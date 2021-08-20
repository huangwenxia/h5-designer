<template>
    <div class="sider-bar">
        <div class="module-bar">
            <ul class="list">
                <li class="item" :class="{ active: index == menutab }" @click="menutab = index" v-for="(item, index) in menuArray" :key="index">
                    <component :is="item.icon" class="icon"></component>
                    <span>{{ item.name }}</span>
                </li>
                <li class="item item-active" :style="{ transform: 'translateY(' + menutab * 100 + '%)' }"><div class="active-border"></div></li>
            </ul>
        </div>
        <div class="module-content" v-if="menutab == 0">页面</div>
        <div class="module-content" v-if="menutab == 1">图层</div>
    </div>
</template>

<script lang="ts">
import { defineComponent,ref } from 'vue';
import { FileTextOutlined, SwitcherOutlined } from '@ant-design/icons-vue';
export default defineComponent({
    components: {
        FileTextOutlined,
        SwitcherOutlined
    },
    setup() {
        const menutab = ref(0)
        const menuArray = ref([{ name: '页面', icon: 'FileTextOutlined' }, { name: '图层', icon: 'SwitcherOutlined' }])
        const fun = ()=>{}
        return {
            menutab,
            menuArray,
            fun
        };
    }
});
</script>

<style scoped lang="scss">
.sider-bar {
    position: fixed;
    left: 0;
    top: 55px;
    background: #f9f9f9;
    bottom: 0;
    display: flex;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    .module-bar {
        .list {
            .item {
                position: relative;
                height: 84px;
                width: 64px;
                display: -webkit-box;
                display: -ms-flexbox;
                display: flex;
                -webkit-box-orient: vertical;
                -webkit-box-direction: normal;
                -ms-flex-direction: column;
                flex-direction: column;
                -webkit-box-align: center;
                -ms-flex-align: center;
                align-items: center;
                -webkit-box-pack: center;
                -ms-flex-pack: center;
                justify-content: center;
                font-size: 14px;
                font-weight: bold;
                color: #464646;
                fill: #a6a6a6;
                cursor: pointer;
                .icon {
                    font-size: 26px;
                    margin-top: 5px;
                }
                &.active{
                    color: #fff;//#fe714b;
                }
                &:hover{
                     color: #fff;
                     background: #1593FF;
                }
            }
            .item-active {
                margin: 0;
                border: none;
                z-index: -1;
                transition: transform 0.3s ease-in-out;
                transition: transform 0.3s ease-in-out;
                top: 0;
                position: absolute;
                height: 84px;
                width: 64px;
                background: #1593FF;

                .active-border {
                    background: 0 0;
                    border: none;
                    position: absolute;
                    width: auto;
                    height: auto;
                    top: 100%;
                    right: 0;
                    border-bottom-right-radius: 4px;
                    border-top-right-radius: 4px;
                }
            }
        }
    }
    .module-content {
        width: 240px;
        background: #fff;
        padding: 20px 10px;
        overflow: auto;
    }
}
</style>
