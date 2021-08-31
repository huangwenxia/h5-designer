import * as I from "@/api/interface/index"
import axios from "@/api/interceptors"
/**
 * @description: 用户登录
 * @params {ILogin} params
 * @return {Promise}
 */
const login = (params: I.user.ILogin): Promise<I.user.ILoginResponse> => {
    return axios.post("/api/system/user/login", params)
}

const register = (params: I.user.IRegister): Promise<I.user.IRegisterResponse> => {
    return axios.post("/api/system/user/regist", params)
}
const getCode = (params: I.user.IGetCode): Promise<I.user.IGetCodeResponse> => {
    return axios.post("/api/system/user/getcode", params)
}
const getUserInfo = (): Promise<I.user.IUserInfoResponse> => {
    return axios.get("/api/system/user/info")
}
const userUpdate = (params: I.user.IUserUpdate): Promise<I.user.IUserUpdateResponse> => {
    return axios.post("/api/system/user/update", params)
}
export default { login, register, getCode, getUserInfo, userUpdate }
