<template>
    <div class="login-container">
        <div class="wrapper">
            <h2 class="title">欢迎登录</h2>
            <div class="login-form">
                <a-form :model="formState" :rules="rules" @finish="onSubmit">
                    <a-form-item name="name">
                        <a-input placeholder="请输入账号" v-model:value="formState.name" size="large">
                            <template #prefix>
                                <user-outlined type="user" />
                            </template>
                        </a-input>
                    </a-form-item>
                    <a-form-item name="password">
                        <a-input v-model:value="formState.password" :type="formState.isShowPwd ? 'text' : 'password'" placeholder="请输入密码" size="large">
                            <template #prefix>
                                <lock-outlined />
                            </template>
                            <template #suffix>
                                <a-button type="link" @click="onShowPassword" size="small">
                                    <eye-invisible-outlined v-if="!formState.isShowPwd" />
                                    <eye-outlined v-if="formState.isShowPwd" />
                                </a-button>
                            </template>
                        </a-input>
                    </a-form-item>
                    <a-form-item>
                        <a-button type="primary" block size="large" html-type="submit">登录</a-button>
                    </a-form-item>
                    <a-form-item class="footer">
                        <a-button type="link" class="btn1 color-gray" @click="goRegister">立即注册 </a-button>
                        <!-- <a-button type="link" class="btn2 color-blue">忘记密码</a-button> -->
                    </a-form-item>
                </a-form>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { useGlobalHook } from "@/hooks/useGlobalHook"
import { defineComponent, reactive, UnwrapRef, ref } from "vue"
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
            isShowPwd: false,
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
        const rules = ref({
            name: [{ required: true, message: "请输入账号", trigger: "blur" }],
            password: [{ required: true, message: "请输入密码", trigger: "blur" }]
        })
        return {
            // labelCol: { span: 4 },
            // wrapperCol: { span: 14 },
            rules,
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
    background: url(../../assets/images/login-bg.jpg) center no-repeat;
    background-size: cover;
    overflow: auto;
    &:after {
        content: "";
        display: block;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background: rgba(0, 0, 0, 0.5);
        position: absolute;
    }
}

.login-container .wrapper {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 384px;
    padding: 20px 40px;
    z-index: 20;
}

.login-container .wrapper {
    background: #fff;
    border-radius: 4px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);

    .title {
        width: 100%;
        text-align: center;
        font-weight: 700;
        margin-bottom: 40px;
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
