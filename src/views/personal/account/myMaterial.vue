<template>
    <div class="my-material">
        <a-card class="info-card">
            <a-button v-if="!isModify" class="modify-btn" type="link" @click="onModify">修改</a-button>
            <a-form :model="formState" labelAlign="right">
                <a-form-item style="text-align: center">
                    <a-avatar>
                        <template #icon>
                            <UserOutlined icon="" />
                        </template>
                    </a-avatar>
                </a-form-item>
                <a-form-item label="用户名">
                    <a-input v-if="isModify" v-model:value="formState.username" />
                    <span v-else>{{ userInfo.username }}</span>
                </a-form-item>
                <a-form-item label="昵称">
                    <a-input v-if="isModify" v-model:value="formState.name" />
                    <span v-else>{{ userInfo.name }}</span>
                </a-form-item>
                <a-form-item label="电话">
                    <a-input v-if="isModify" v-model:value="formState.phone" />
                    <span v-else>{{ userInfo.phone || "--" }}</span>
                </a-form-item>
                <a-form-item label="邮箱">
                    <a-input v-if="isModify" v-model:value="formState.email" />
                    <span v-else>{{ userInfo.email }}</span>
                </a-form-item>
                <a-form-item label="性别">
                    <a-radio-group v-if="isModify" v-model:value="formState.sex">
                        <a-radio :value="1">男</a-radio>
                        <a-radio :value="2">女</a-radio>
                    </a-radio-group>
                    <span v-else>{{ userInfo.sex == "1" ? "男" : "女" }}</span>
                </a-form-item>
                <a-form-item label="生日">
                    <a-input v-if="isModify" v-model:value="formState.birth" />
                    <span v-else>{{ userInfo.birth || "--" }}</span>
                </a-form-item>
                <a-form-item label="地址">
                    <a-input v-if="isModify" v-model:value="formState.address" />
                    <span v-else>{{ userInfo.address || "--" }}</span>
                </a-form-item>
                <a-form-item v-if="isModify" :wrapper-col="{ offset: 8 }">
                    <a-button @click="onCancel">取消</a-button>
                    <a-button type="primary" style="margin-left: 10px" @click="onSubmit">保存</a-button>
                </a-form-item>
            </a-form>
        </a-card>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRaw, UnwrapRef, ref, computed } from "vue"
import { UserOutlined } from "@ant-design/icons-vue"
import { useGlobalHook } from "@/hooks/useGlobalHook"
interface FormState {
    name: string
    username: string
    avatar: string
    phone: string | number
    sex: string | number //1、男，2、女
    address: string
    birth: string | number
    email: string
}
export default defineComponent({
    components: {
        UserOutlined
    },
    setup() {
        const { store, api, message } = useGlobalHook()
        const userInfo = computed(() => store.getters.getUserInfo)
        const formState: UnwrapRef<FormState> = reactive({
            name: userInfo.value.name,
            username: userInfo.value.username,
            avatar: userInfo.value.avatar,
            phone: userInfo.value.phone,
            sex: userInfo.value.sex, //1、男，2、女
            address: userInfo.value.address,
            email: userInfo.value.email,
            birth: userInfo.value.birth
        })
        const isModify = ref<boolean>(false)
        const methods = reactive({
            onModify() {
                isModify.value = true
            },
            onCancel() {
                formState.name = userInfo.value.name
                formState.username = userInfo.value.username
                formState.avatar = userInfo.value.avatar || ""
                formState.phone = userInfo.value.phone || ""
                formState.sex = userInfo.value.sex
                formState.email = userInfo.value.email
                formState.address = userInfo.value.address || ""
                formState.birth = userInfo.value.birth || ""
                isModify.value = false
            },
            onSubmit() {
                api.userApi
                    .userUpdate(toRaw(formState))
                    .then((res) => {
                        if (!res) return
                        store.dispatch("GET_USER_INFO").then(() => {
                            message.success("修改成功")
                            isModify.value = false
                        })
                    })
                    .catch((err) => {
                        console.error(err)
                    })
            }
        })
        return {
            formState,
            isModify,
            userInfo,
            ...methods
        }
    }
})
</script>
<style lang="scss" scoped>
.my-material {
    //padding: 10px 20px;
}
.info-card {
    width: 500px;
    border: 1px solid #dddddd;
    position: relative;
    .modify-btn {
        position: absolute;
        right: 16px;
        top: 5px;
        visibility: hidden;
    }
    &:hover {
        .modify-btn {
            visibility: visible;
        }
    }
}
</style>
