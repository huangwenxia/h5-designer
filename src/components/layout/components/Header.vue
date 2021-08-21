<template>
    <div class="header-container clearfix">
        <div class="logo" @click="testLogin">
            <a-image :width="40" :src="loginUrl" />
        </div>
        <div class="no-login" v-if="isLogin">
            <a-button type="link">登录</a-button>
            |
            <a-button type="link">注册</a-button>
        </div>
        <div class="logged" v-if="!isLogin">
            <a-dropdown>
                <template #overlay>
                    <a-menu @click="handleMenuClick">
                        <a-menu-item key="1">
                            <router-link tag="div" to="''">我的作品</router-link>
                        </a-menu-item>
                        <a-menu-item key="2">
                            <router-link tag="div" to="''">素材</router-link>
                        </a-menu-item>
                        <a-menu-item key="3">
                            <router-link tag="div" to="''">我的资料 </router-link>
                        </a-menu-item>
                        <a-menu-item key="4">
                            <router-link tag="div" to="''">我的收藏 </router-link>
                        </a-menu-item>
                        <a-menu-item key="5">
                            <router-link tag="div" to="''">退出</router-link>
                        </a-menu-item>
                    </a-menu>
                </template>
                <a-button class="logged-info" type="link">
                    <a-avatar>
                        <template #icon>
                            <UserOutlined icon="" />
                        </template>
                    </a-avatar>
                    <span class="user-name">张三</span>
                </a-button>
            </a-dropdown>
        </div>
    </div>
</template>

<script lang="ts">
import { UserOutlined } from "@ant-design/icons-vue"
import { defineComponent, ref } from "vue"
export default defineComponent({
    name: "Header",
    components: {
        UserOutlined
    },
    setup() {
        const handleMenuClick = (e: Event) => {
            console.log("click", e)
        }
        const isLogin = ref<boolean>(false)
        const loginUrl = require("@/assets/logo.png")
        const testLogin = () => {
            isLogin.value = !isLogin.value
        }
        return {
            isLogin,
            loginUrl,
            handleMenuClick,
            testLogin
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
