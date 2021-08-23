import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from "axios"
import { checkStatus } from "./checkStatus"
// import router from "@/router"
const axiosInstance: AxiosInstance = axios.create({
    baseURL: "",
    headers: {
        "Content-Type": "application/json",
        "Accept-Language": "zh-CN"
    }
})

// axios实例拦截响应
axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => {
        if (checkStatus(response)) return
        return response.data
    },
    // 请求失败
    (error: AxiosError) => {
        return Promise.reject(error)
    }
)

// axios实例拦截请求
axiosInstance.interceptors.request.use(
    (config: AxiosRequestConfig) => {
        // const { user } = store.state
        // if (token) {
        //   config.headers.Authorization = `Bearer ${token}`
        // }
        return config
    },
    (error: AxiosError) => {
        return Promise.reject(error)
    }
)

export default axiosInstance
