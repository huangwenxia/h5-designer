<template>
    <div class="login-container">
        <div class="wrapper">
            <h2 class="title">欢迎注册</h2>
            <div class="login-form">
                <a-form :model="formState">
                    <a-form-item>
                        <a-input placeholder="请输入用户名" v-model:value="formState.username">
                            <template #prefix>
                                <user-outlined type="user" />
                            </template>
                        </a-input>
                    </a-form-item>
                    <a-form-item>
                        <a-input placeholder="请输入邮箱" v-model:value="formState.email">
                            <template #prefix>
                                <MailOutlined />
                            </template>
                            <template #suffix>
                                <a-button v-if="formState.wait == '-1'" size="small" @click="getCode">发送验证码</a-button>
                                <a-button v-else size="small">{{ formState.wait }}秒后再次获取</a-button>
                            </template>
                        </a-input>
                    </a-form-item>
                    <a-form-item>
                        <a-input :type="formState.isShowCode ? 'text' : 'password'" v-model:value="formState.code" placeholder="请输入验证码">
                            <template #prefix>
                                <lock-outlined />
                            </template>
                            <template #suffix>
                                <div @click="onShowCode">
                                    <eye-invisible-outlined v-if="!formState.isShowCode" />
                                    <eye-outlined v-if="formState.isShowCode" />
                                </div>
                            </template>
                        </a-input>
                    </a-form-item>
                    <a-form-item>
                        <a-input v-model:value="formState.password" placeholder="请输入密码">
                            <template #prefix>
                                <lock-outlined />
                            </template>
                        </a-input>
                    </a-form-item>
                    <a-form-item>
                        <a-button type="primary" block @click="onSubmit">注册</a-button>
                    </a-form-item>
                    <a-form-item class="footer">
                        <a-button type="link" class="btn1 color-gray" @click="onBack">返回 </a-button>
                        <a-button type="link" class="btn2 color-blue">忘记密码</a-button>
                    </a-form-item>
                </a-form>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { useGlobalHook } from "@/hooks/useGlobalHook"
import { defineComponent, reactive, toRaw, UnwrapRef } from "vue"
import { UserOutlined, LockOutlined, EyeOutlined, EyeInvisibleOutlined, MailOutlined } from "@ant-design/icons-vue"

interface FormState {
    code: string
    password: string
    username: string
    email: string
    isShowCode: boolean
    wait: number
}

export default defineComponent({
    name: "Register",
    components: {
        UserOutlined,
        EyeOutlined,
        LockOutlined,
        MailOutlined,
        EyeInvisibleOutlined
    },
    setup() {
        const { api, router, message } = useGlobalHook()
        const formState: UnwrapRef<FormState> = reactive({
            email: "",
            username: "",
            code: "",
            password: "",
            isShowCode: true,
            wait: -1
        })
        const onSubmit = () => {
            api.userApi
                .register(toRaw(formState))
                .then((res) => {
                    if (!res) return
                    message.success("注册成功")
                    router.push("/login")
                })
                .catch((err) => {
                    console.error(err)
                })
        }

        const onShowCode = () => {
            formState.isShowCode = !formState.isShowCode
        }
        const onBack = () => {
            router.push("/login")
        }
        const getCode = () => {
            if (!formState.email) return message.warning("请输入邮箱")
            api.userApi
                .getCode({ email: formState.email })
                .then((res) => {
                    if (!res) return
                    formState.wait = 60
                    let timer = setInterval(function () {
                        if (formState.wait == -1) {
                            clearInterval(timer)
                        } else {
                            formState.wait--
                        }
                    }, 1000)
                })
                .catch((err) => {
                    console.error(err)
                })
        }
        return {
            formState,
            onSubmit,
            onBack,
            getCode,
            onShowCode
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
    padding: 20px;
    z-index: 20;
}

.login-container .wrapper {
    background: #fff;
    border-radius: 4px;

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
