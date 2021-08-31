<template>
    <div class="login-container">
        <div class="wrapper">
            <h2 class="title">欢迎登录</h2>
            <div class="login-form">
                <a-form :model="formState">
                    <a-form-item>
                        <a-input placeholder="请输入账号" v-model:value="formState.name">
                            <template #prefix>
                                <user-outlined type="user" />
                            </template>
                        </a-input>
                    </a-form-item>
                    <a-form-item>
                        <a-input v-model:value="formState.password" :type="formState.isShowPwd ? 'text' : 'password'" placeholder="请输入密码">
                            <template #prefix>
                                <lock-outlined />
                            </template>
                            <template #suffix>
                                <a-button type="link" size="small" @click="onShowPassword">
                                    <eye-invisible-outlined v-if="!formState.isShowPwd" />
                                    <eye-outlined v-if="formState.isShowPwd" />
                                </a-button>
                            </template>
                        </a-input>
                    </a-form-item>
                    <a-form-item>
                        <a-button type="primary" block @click="onSubmit">登录</a-button>
                    </a-form-item>
                    <a-form-item class="footer">
                        <a-button type="link" class="btn1 color-gray" @click="goRegister">立即注册 </a-button>
                        <a-button type="link" class="btn2 color-blue">忘记密码</a-button>
                    </a-form-item>
                </a-form>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { useGlobalHook } from "@/utils/useGlobalHook"
import { defineComponent, reactive, UnwrapRef } from "vue"
import { UserOutlined, LockOutlined, EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons-vue"

interface FormState {
    name: string
    password: string
    isShowPwd: boolean
    token: string
}

export default defineComponent({
    name: "Login",
    components: {
        UserOutlined,
        EyeOutlined,
        LockOutlined,
        EyeInvisibleOutlined
    },
    setup: function () {
        // const internalInstance = getCurrentInstance() as any
        // const $api = internalInstance.appContext.config.globalProperties.$api
        // const { ctx } = getCurrentInstance() as any
        // const internalInstance = getCurrentInstance() // 有效
        // console.log(ctx.$api, "===========internalInstance")
        const { api, store, router, message } = useGlobalHook()
        const formState: UnwrapRef<FormState> = reactive({
            name: "",
            password: "",
            isShowPwd: true,
            token: ""
        })
        const onSubmit = () => {
            api.userApi
                .login({ name: formState.name, password: formState.password })
                .then((res) => {
                    if (!res) return
                    formState.token = res.result || ""
                    localStorage.setItem("token", formState.token)
                    store.dispatch("GET_USER_INFO").then(() => {
                        message.success("登录成功")
                        router.push("/home")
                    })
                })
                .catch((err) => {
                    console.error(err)
                })
        }
        const onShowPassword = () => {
            formState.isShowPwd = !formState.isShowPwd
        }
        const goRegister = () => {
            router.push("/register")
        }
        return {
            // labelCol: { span: 4 },
            // wrapperCol: { span: 14 },
            formState,
            onSubmit,
            onShowPassword,
            goRegister
        }
    }
})
</script>
<style scoped lang="scss">
.login-container {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background: url(../../assets/images/login-bg.png) center no-repeat;
    background-size: cover;
    overflow: auto;
}

.login-container .wrapper {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 384px;
    padding: 20px;
}

.login-container .wrapper {
    background: #fff;
    border-radius: 4px;

    .title {
        width: 100%;
        text-align: center;
        font-weight: 700;
    }

    .login-form {
        width: 100%;

        .footer {
            .btn1 {
                float: left;
                margin-left: -14px;
                &.ant-btn-link {
                    color: #333;
                }
            }

            .btn2 {
                float: right;
                margin-right: -14px;
            }
        }
    }
}
</style>
