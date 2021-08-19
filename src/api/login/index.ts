import * as I from "@/api/interface/index"
import axios from "@/api/interceptors"
/**
 * @description: 用户登录
 * @params {ILogin} params
 * @return {Promise}
 */
const login = (params: I.login.ILogin): Promise<I.common.IResponse> => {
    return axios.post("user/login", params)
}

export default { login }
