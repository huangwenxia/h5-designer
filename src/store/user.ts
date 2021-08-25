import { Module, ActionTree } from "vuex"
import { GlobalDataProps } from "./index"
import * as I from "@/api/interface/index"
import $ctx from "@/utils/useGlobal"

export interface UserStateProps {
    info: I.user.InfoResponseResult
}

export interface UserActionsProps {
    info: I.user.InfoResponseResult
}
export const userActions: ActionTree<UserStateProps, any> = {
    getUserInfo({ commit }) {
        $ctx.api.userApi
            .getUserInfo()
            .then((res) => {
                commit("SET_USER", res.result)
                $ctx.message.success("登录成功")
                console.log("===========11111")

                $ctx.router.push("/home")
            })
            .catch((err) => {
                console.error(err)
            })
    }
}

const userModule: Module<UserStateProps, GlobalDataProps> = {
    state: {
        info: {
            id: "",
            username: "",
            email: "",
            name: "",
            sex: "",
            type: "",
            phone: "",
            status: "",
            lastLoginTime: "",
            lastLoginIp: "",
            createdAt: "",
            updatedAt: "",
            avatar: ""
        }
    },
    mutations: {
        SET_USER: (state: UserStateProps, info: I.user.InfoResponseResult) => {
            state.info = info
        }
    },
    getters: {
        getUserInfo: (state) => {
            return state.info
        }
    },
    // actions:userActions,
    actions: {
        getUserInfo(context) {
            $ctx.api.userApi
                .getUserInfo()
                .then((res) => {
                    context.commit("SET_USER", res.result)
                    $ctx.message.success("登录成功")
                    console.log("===========11111")
                    $ctx.router.push("/home")
                })
                .catch((err) => {
                    console.error(err)
                })
        }
    }
}

export default userModule
