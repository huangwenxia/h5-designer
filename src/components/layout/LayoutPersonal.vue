<template>
    <div class="layout-container">
        <a-layout>
            <Header></Header>
            <a-layout class="aside">
                <a-layout-sider width="200" theme="light" class="aside-slider">
                    <a-menu mode="inline"
                            v-model:selectedKeys="sideBar.selectedKeys"
                            :openKeys="sideBar.openKeys"
                            @openChange="onOpenChange"
                            :style="{ height: '100%', borderRight: 0 }">
                        <a-sub-menu v-for="item in menuList" :key="item.path">
                            <template #title>
                                <span>
                                    {{ item.name }}
                                </span>
                            </template>
                            <a-menu-item v-for="child in item.children" :key="child.path">
                                <router-link tag="div" :to="child.path">
                                    <component :is="child.icon"></component>
                                    {{ child.name }}
                                </router-link>
                            </a-menu-item>
                        </a-sub-menu>
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
import { UserOutlined, LaptopOutlined, NotificationOutlined, } from "@ant-design/icons-vue"
import Header from "./components/Header.vue"
import { computed, defineComponent, reactive, toRefs } from "vue"
import { useStore } from "vuex"
export default defineComponent({
    name: "PersonalCenter",
    components: {
        UserOutlined,
        LaptopOutlined,
        NotificationOutlined,
        Header
    },
    setup() {
        const currStore = useStore()
        const sideBar = computed(() => currStore.getters.getSideBar)
        const menuList = reactive([
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
        ])
        const onOpenChange = (openKeys: string[]) => {
            const latestOpenKey = openKeys.find((key) => state.openKeys.indexOf(key) === -1)
            if (state.rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
                state.openKeys = openKeys
            } else {
                state.openKeys = latestOpenKey ? [latestOpenKey] : []
            }
            currStore.commit("setOpenKeys",state.openKeys)
        }

        const rootSubmenuKeys = menuList.map((item) => item.path)
        const state = reactive({
            rootSubmenuKeys: rootSubmenuKeys,
            openKeys: [rootSubmenuKeys[0]],
            selectedKeys:[],
        })

        return {
            ...toRefs(state),
            menuList,
            sideBar,
            // handleClick,
            onOpenChange
        }
    }
})
</script>
<style scoped lang="scss">
.layout-container {
    height: calc(100vh - 27px);
}
.layout-container .aside {
    min-height: calc(100vh - 50px);
    .aside-slider {
        border-right: 1px solid #ddd;
        /*.ant-layout-sider-children .ant-menu ant-menu-root  .ant-menu-submenu{*/
        /*   */
        /*}*/
        :deep(.ant-menu-submenu-selected){
            color: #000000d9;
        }
        :deep(.ant-menu-submenu-open){
            color:#1890ff
        }
    }
}
</style>
