<template>
    <div class="header-container clearfix">
        <div class="logo">
            <router-link tag="span" to="/">
                <a-image :width="40" :src="loginUrl" :preview="false" />
                <span class="txt">H5设计平台</span>
            </router-link>
        </div>
        <div class="no-login" v-if="!userInfo.id">
            <a-button type="link" @click="login">登录</a-button>|<a-button type="link" @click="register">注册</a-button>
        </div>
        <div class="logged" v-if="userInfo.id">
            <a-dropdown>
                <template #overlay>
                    <a-menu class="menu">
                        <a-menu-item key="1">
                            <router-link class="link" tag="div" to="/personal/design/myWorks">我的作品</router-link>
                        </a-menu-item>
                        <a-menu-item key="2">
                            <router-link class="link" tag="div" to="/personal/design/material">素材</router-link>
                        </a-menu-item>
                        <a-menu-item key="3">
                            <router-link class="link" tag="div" to="/personal/account/myMaterial">我的资料 </router-link>
                        </a-menu-item>
                        <a-menu-item key="4">
                            <router-link class="link" tag="div" to="/personal/account/myCollect">我的收藏 </router-link>
                        </a-menu-item>
                        <a-menu-item key="5">
                            <a-button class="link" type="link" size="small" @click="logout"> 退出 </a-button>
                        </a-menu-item>
                    </a-menu>
                </template>
                <a-button class="logged-info" type="link" @click.stop="toUser">
                    <a-avatar>
                        <template #icon>
                            <component :is="'UserOutlined'"></component>
                        </template>
                    </a-avatar>
                    <span class="user-name">{{ userInfo.name || userInfo.username }}</span>
                </a-button>
            </a-dropdown>
        </div>
    </div>
</template>

<script lang="ts">
import { useGlobalHook } from "@/hooks/useGlobalHook"
import { UserOutlined } from "@ant-design/icons-vue"
import { computed, defineComponent } from "vue"

export default defineComponent({
    name: "Header",
    components: {
        UserOutlined
    },
    setup() {
        const { store, router, message } = useGlobalHook()
        // const handleMenuClick = (e: Event) => {
        //     // console.log("click", e)
        // }
        const loginUrl = require("@/assets/logo.png")
        const logout = () => {
            store.commit("CLEAR_USER")
            message.success("退出成功")
            if (router.currentRoute.value.name != "home") {
                router.replace("/")
            }
        }
        const login = () => {
            router.push("/login")
        }
        const register = () => {
            router.push("/register")
        }
        const userInfo = computed(() => store.getters.getUserInfo)
        const toUser = () => {
            console.log("2222")
            router.push("/personal")
        }
        return {
            loginUrl,
            // handleMenuClick,
            register,
            login,

            logout,
            userInfo,
            toUser
        }
    }
})
</script>
<style lang="scss">
.header-container {
    width: 100%;
    padding: 10px 25px;
    background: #ffffff;
    position: relative;
    z-index: 50;
    border-bottom: 1px solid $color-border;
}

.header-container .logo {
    float: left;
    .ant-image {
        vertical-align: middle;
    }
    .txt {
        margin-left: 20px;
        font-size: 18px;
        vertical-align: middle;
    }
    a {
        color: #444;
    }
}

.header-container .no-login {
    float: right;
}

.header-container .logged {
    float: right;
}
.menu {
    .link {
        color: #444;
        padding: 0 20px;
    }
}
.header-container .logged-info {
    height: 100%;
    .user-name {
        padding-left: 10px;
    }
}
</style>
