<template>
    <div class="header-container clearfix">
        <div class="logo">
            <a-image :width="40" :src="loginUrl" />
            <span class="txt">H5设计平台</span>
        </div>
        <div class="no-login" v-if="!userInfo.id">
            <a-button type="link" @click="login">登录</a-button>
            |
            <a-button type="link" @click="register">注册</a-button>
        </div>
        <div class="logged" v-if="userInfo.id">
            <a-dropdown>
                <template #overlay>
                    <a-menu>
                        <a-menu-item key="1">
                            <router-link tag="div" to="/personal/design/myWorks">我的作品</router-link>
                        </a-menu-item>
                        <a-menu-item key="2">
                            <router-link tag="div" to="/personal/design/material">素材</router-link>
                        </a-menu-item>
                        <a-menu-item key="3">
                            <router-link tag="div" to="/personal/account/myMaterial">我的资料 </router-link>
                        </a-menu-item>
                        <a-menu-item key="4">
                            <router-link tag="div" to="/personal/account/myCollect">我的收藏 </router-link>
                        </a-menu-item>
                        <a-menu-item key="5">
                            <router-link tag="div" to="/login">退出</router-link>
                        </a-menu-item>
                    </a-menu>
                </template>
                <a-button class="logged-info" type="link">
                    <a-avatar>
                        <template #icon>
                            <UserOutlined icon="" />
                        </template>
                    </a-avatar>
                    <span class="user-name">{{ userInfo.username }}</span>
                </a-button>
            </a-dropdown>
        </div>
    </div>
</template>

<script lang="ts">
import { useGlobalHook } from "@/utils/useGlobalHook"
import { UserOutlined } from "@ant-design/icons-vue"
import { computed, defineComponent } from "vue"

export default defineComponent({
    name: "Header",
    components: {
        UserOutlined
    },
    setup() {
        const { store, router } = useGlobalHook()
        // const handleMenuClick = (e: Event) => {
        //     // console.log("click", e)
        // }
        const loginUrl = require("@/assets/logo.png")
        const login = () => {
            router.push("/login")
        }
        const register = () => {
            router.push("/register")
        }
        const userInfo = computed(() => store.getters.getUserInfo)
        return {
            loginUrl,
            // handleMenuClick,
            login,
            register,
            userInfo
        }
    }
})
</script>
<style lang="scss">
.header-container {
    width: 100%;
}

.header-container .logo {
    float: left;
    .txt {
        margin-left: 30px;
        color: #666;
    }
}

.header-container .no-login {
    float: right;
}

.header-container .logged {
    float: right;
}
.header-container .logged-info {
    height: 100%;
    .user-name {
        padding-left: 10px;
    }
}
</style>
