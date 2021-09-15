import { Module, ActionTree, Commit } from "vuex"
import * as I from "@/api/interface/index"
import { GlobalDataProps } from "@/store/index"
import api from "@/api/index"
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
    ["GET_USER_INFO"]({ commit }: { commit: Commit; state: UserStateProps }): Promise<I.user.InfoResponseResult | undefined>
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
            avatar: "",
            birth: "",
            address: ""
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
        GET_USER_INFO: function ({ commit }) {
            return new Promise((resolve, reject) => {
                api.userApi
                    .getUserInfo()
                    .then((res) => {
                        commit("SET_USER", res.result)
                        resolve(res.result)
                    })
                    .catch((err) => {
                        reject(err)
                    })
            })
        }
    }
}

export default userModule
