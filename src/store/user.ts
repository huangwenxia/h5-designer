import { Module, ActionTree, Commit } from "vuex"
import * as I from "@/api/interface/index"
import $ctx from "@/utils/useGlobal"
import { GlobalDataProps } from "@/store/index"

export interface UserStateProps {
    info: I.user.InfoResponseResult
}
export interface Actions {
    // // 用户登录
    // [Action.SING_IN](
    //     { commit }: { commit: Commit; state: State },
    //     payload: SignupRequest
    // ): Promise<string>
    // 用户登出
    // [Action.SING_OUT]({ commit }: { commit: Commit; state: State }): Promise<void>
    // 用户信息
    ["GET_USER_INFO"]({ commit }: { commit: Commit; state: UserStateProps }): void
}
const userModule: Module<UserStateProps, GlobalDataProps> = {
    namespaced: true,
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
    actions: <ActionTree<UserStateProps, GlobalDataProps> & Actions>{
        GET_USER_INFO({ commit }) {
            $ctx.api.userApi
                .getUserInfo()
                .then((res) => {
                    commit("SET_USER", res.result)
                    $ctx.message.success("登录成功")
                    $ctx.router.push("/home")
                })
                .catch((err) => {
                    console.error(err)
                })
        }
    }
}

export default userModule
