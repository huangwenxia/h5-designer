<template>
    <div class="layout-container">
        <a-layout>
            <a-layout-header class="header">
                <Header></Header>
            </a-layout-header>
            <a-layout class="aside">
                <a-layout-sider width="200" theme="light" class="aside-slider">
                    <a-menu mode="inline" v-model:selectedKeys="selectedKeys2" v-model:openKeys="openKeys" :style="{ height: '100%', borderRight: 0 }">
                        <a-sub-menu v-for="item in menuList" :key="item.sortIndex">
                            <template #title>
                                <span>
                                    {{ item.name }}
                                </span>
                            </template>
                            <a-menu-item v-for="child in item.children" :key="child.sortIndex">
                                <router-link tag="div" :to="child.path">
                                    <component :is="child.icon"></component>
                                    {{ child.name }}
                                </router-link>
                            </a-menu-item>
                        </a-sub-menu>
                        <!--                        <a-sub-menu key="sub1">-->
                        <!--                            <template #title>-->
                        <!--                                <span>-->
                        <!--                                    <user-outlined />-->
                        <!--                                    创意设计-->
                        <!--                                </span>-->
                        <!--                            </template>-->
                        <!--                            <a-menu-item key="1"><router-link tag="div" to="/personal/myWorks">我的作品</router-link></a-menu-item>-->
                        <!--                            <a-menu-item key="2">素材</a-menu-item>-->
                        <!--                        </a-sub-menu>-->
                        <!--                        <a-sub-menu key="sub2">-->
                        <!--                            <template #title>-->
                        <!--                                <span>-->
                        <!--                                    <laptop-outlined />-->
                        <!--                                    数据分析-->
                        <!--                                </span>-->
                        <!--                            </template>-->
                        <!--                            <a-menu-item key="5">传播数据</a-menu-item>-->
                        <!--                        </a-sub-menu>-->
                        <!--                        <a-sub-menu key="sub3">-->
                        <!--                            <template #title>-->
                        <!--                                <span>-->
                        <!--                                    <notification-outlined />-->
                        <!--                                    账号管理-->
                        <!--                                </span>-->
                        <!--                            </template>-->
                        <!--                            <a-menu-item key="9">我的资料</a-menu-item>-->
                        <!--                            <a-menu-item key="10">我的收藏</a-menu-item>-->
                        <!--                        </a-sub-menu>-->
                    </a-menu>
                </a-layout-sider>
                <a-layout style="padding: 0">
                    <a-layout-content
                        :style="{
                            background: '#fff',
                            padding: '24px',
                            margin: 0,
                            minHeight: '280px'
                        }"
                    >
                        <router-view />
                    </a-layout-content>
                </a-layout>
            </a-layout>
        </a-layout>
    </div>
</template>

<script lang="ts">
import { UserOutlined, LaptopOutlined, NotificationOutlined } from "@ant-design/icons-vue"
import Header from "./components/Header.vue"
import { defineComponent, reactive, ref } from "vue"
export default defineComponent({
    name: "PersonalCenter",
    components: {
        UserOutlined,
        LaptopOutlined,
        NotificationOutlined,
        Header
    },
    setup() {
        return {
            menuList: reactive([
                {
                    name: "创意设计",
                    icon: "",
                    level: "0",
                    sortIndex: "01",
                    path: "/personal/design",
                    children: [
                        { path: "/personal/design/myWorks", icon: "UserOutlined", name: "我的作品", level: "1", sortIndex: "0111" },
                        { path: "/personal/design/material", icon: "UserOutlined", name: "素材", level: "1", sortIndex: "0112" }
                    ]
                },
                {
                    name: "数据分析",
                    icon: "",
                    path: "/personal/analyze",
                    level: "0",
                    sortIndex: "02",
                    children: [{ path: "/personal/analyze/data", icon: "LaptopOutlined", name: "传播数据", level: "1", sortIndex: "0211" }]
                },
                {
                    name: "账号管理",
                    icon: "",
                    path: "/personal/account",
                    level: "0",
                    sortIndex: "03",
                    children: [
                        { path: "/personal/account/myMaterial", icon: "NotificationOutlined", name: "我的资料", level: "1", sortIndex: "0311" },
                        { path: "/personal/account/myCollect", icon: "NotificationOutlined", name: "我的收藏", level: "1", sortIndex: "0312" }
                    ]
                }
            ]),
            selectedKeys2: ref<string[]>(["0111"]),
            collapsed: ref<boolean>(false),
            openKeys: ref<string[]>(["01"])
        }
    }
})
</script>
<style scoped lang="scss">
.layout-container {
    height: calc(100vh - 27px);
}

.layout-container .header {
    background: #ffffff;
    position: relative;
    z-index: 1110;
    border-bottom: 1px solid #ddd;
    padding: 0 25px;
}
.layout-container .aside {
    min-height: calc(100vh - 50px);
    .aside-slider {
        border-right: 1px solid #ddd;
    }
}
</style>
