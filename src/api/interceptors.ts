import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from "axios"
import { message } from "ant-design-vue"

import router from "@/router/index"
import store from "@/store"
// import { useStore } from "vuex"

import * as I from "@/api/interface"
const axiosInstance: AxiosInstance = axios.create({
    baseURL: "",
    headers: {
        "Content-Type": "application/json",
        "Accept-Language": "zh-CN"
    }
})
const messageConfig = <I.base.BaseMessageConfig>{
    top: `100px`,
    duration: 2,
    maxCount: 3
}
message.config(messageConfig)

const checkStatus = function (status: number | string, response: AxiosResponse): Promise<AxiosResponse> {
    switch (status) {
        //hwx:不写花括号限定块级作用域,const let var 都会jslint报错
        case 401: {
            // 401 用户未登录，清空本地缓存
            const RouterInfo = router.currentRoute.value
            store.commit("CLEAR_USER") // const store = useStore()
            localStorage.removeItem("token")
            message.error(response.data.message || "未授权，请重新登录(401)")
            if (RouterInfo.name != "login") {
                router.replace("/login").catch((err) => {
                    console.error(err)
                })
            }
            break
        }
        case 404:
            // return Promise.reject(error);
            break
        case 500: //500
            message.destroy() //全局销毁，防止请求报错太多情况
            message.error(response.data.message || "服务器请求失败，请稍后重试")
            break
        default:
            message.error(response.data.message || `连接出错(${status})!`) //其他错误
    }
    return Promise.reject(response)
}
// axios实例拦截响应
axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => {
        if (!response.data) return Promise.reject(response)
        if (response.data.status == 200) {
            return response.data
        } else {
            return checkStatus(response.data.status, response)
        }
    },
    // 请求失败
    (error: AxiosError) => {
        const response = error.response
        return Promise.reject(response || { message: error.message })
    }
)
// axios实例拦截请求
axiosInstance.interceptors.request.use(
    (config: AxiosRequestConfig) => {
        const token = localStorage.getItem("token")
        if (token) {
            // config.headers.Authorization = `Bearer ${token}`
            config.headers.Authorization = token
        }
        return config
    },
    (error: AxiosError) => {
        return Promise.reject(error)
    }
)

export default axiosInstance

// switch (response.data.status) {
//     case 400:
//         messageText = "请求错误(400)"
//         break
//     case 401:
//         messageText = "未授权，请重新登录(401)"
//         break
//     case 403:
//         messageText = "拒绝访问(403)"
//         break
//     case 404:
//         messageText = "请求出错(404)"
//         break
//     case 408:
//         messageText = "请求超时(408)"
//         break
//     case 500:
//         messageText = "服务器错误(500)"
//         break
//     case 501:
//         messageText = "服务未实现(501)"
//         break
//     case 502:
//         messageText = "网络错误(502)"
//         break
//     case 503:
//         messageText = "服务不可用(503)"
//         break
//     case 504:
//         messageText = "网络超时(504)"
//         break
//     case 505:
//         messageText = "HTTP版本不受支持(505)"
//         break
//     default:
//         messageText = `连接出错(${status})!`
// }
