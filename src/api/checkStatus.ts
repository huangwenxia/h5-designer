import { AxiosResponse } from "axios"
import { message } from "ant-design-vue"

export const checkStatus = (response: AxiosResponse): string => {
    let messageText = ""
    if (response.data.status != 200 && response.config.responseType != "blob") {
        messageText = response.data.message
        Promise.reject(response.data)
    }

    if (response.config.responseType == "blob" && !response.data.size) {
        messageText = "文件不存在"
    }
    if (response.data.status == 500 && response.data.result && (response.data.result.format || response.data.result.repeat)) {
        //这里调用错误提示面板
        Promise.reject(response.data)
    }
    if (messageText) {
        message.destroy()
        message.error(messageText)
    }
    return messageText
}

// switch (response.data.status) {
//     case 400:
//         messageText = "请求错误(400)"
//
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
