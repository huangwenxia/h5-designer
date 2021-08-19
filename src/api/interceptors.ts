import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios"
import { message } from "ant-design-vue"
const axiosInstance: AxiosInstance = axios.create({
    baseURL: process.env.VUE_APP_BASE_URL + "/",
    headers: {
        "Content-Type": "application/json",
        "Accept-Language": "zh-CN"
    }
})

// axios实例拦截响应
axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => {
        let pass = true
        let mes = "获取数据失败"
        if (response.data.status != 200 && response.config.responseType != "blob") {
            pass = false
            mes = response.data.message
            // checkStatus(response.data.status, response);
            return Promise.reject(response.data)
        }

        if (response.config.responseType == "blob" && !response.data.size) {
            pass = false
            mes = "文件不存在"
        }
        if (response.data.status == 500 && response.data.result && (response.data.result.format || response.data.result.repeat)) {
            //这里调用错误提示面板
            return Promise.reject(response.data)
        }
        if (!pass) {
            message.warning(mes)
            return Promise.reject(response.data)
        }
        return response.data
    },
    // 请求失败
    (error: any) => {
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
    (error: any) => {
        return Promise.reject(error)
    }
)

export default axiosInstance
