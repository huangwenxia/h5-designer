import * as I from "@/api/interface/index"
import axios from "@/api/interceptors"
import { BaseResponse } from "@/api/interface/base"

/**
 * @description: 用户登录
 * @params {ILogin} params
 * @return {Promise}
 */
const login = (params: I.user.ILogin): Promise<BaseResponse<string | undefined>> => {
    return axios.post("/api/system/user/login", params)
}

const register = (params: I.user.IRegister): Promise<BaseResponse<undefined>> => {
    return axios.post("/api/system/user/regist", params)
}
const getCode = (params: I.user.IGetCode): Promise<BaseResponse<undefined>> => {
    return axios.post("/api/system/user/getcode", params)
}
const getUserInfo = (): Promise<BaseResponse<I.user.InfoResponseResult>> => {
    return axios.get("/api/system/user/info")
}
const userUpdate = (params: I.user.IUserUpdate): Promise<BaseResponse<string | undefined>> => {
    return axios.post("/api/system/user/update", params)
}
export default { login, register, getCode, getUserInfo, userUpdate }
