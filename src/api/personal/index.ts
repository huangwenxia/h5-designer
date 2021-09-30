import * as I from "@/api/interface/index"
import axios from "@/api/interceptors"
import { BaseResponse, ListPageType } from "@/api/interface/base"

/**
 * @description: ge
 * @params {ILogin} params
 * @return {Promise}
 */

const list = (): Promise<BaseResponse<ListPageType<I.personal.baseRow>>> => {
    return axios.get("/api/scene/list")
}
// const login = (params: I.user.ILogin): Promise<BaseResponse<string | undefined>> => {
//     return axios.post("/api/system/user/login", params)
// }

// const register = (params: I.user.IRegister): Promise<BaseResponse<undefined>> => {
//     return axios.post("/api/system/user/regist", params)
// }
// const getCode = (params: I.user.IGetCode): Promise<BaseResponse<undefined>> => {
//     return axios.post("/api/system/user/getcode", params)
// }

// const userUpdate = (params: I.user.IUserUpdate): Promise<BaseResponse<string | undefined>> => {
//     return axios.post("/api/system/user/update", params)
// }
export default { list }
