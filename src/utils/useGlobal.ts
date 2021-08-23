import { message } from "ant-design-vue"
import router from "@/router"
import api from "@/api/index"
interface messageConfig {
    top: string
    duration: number
    maxCount: number
}
const messageConfig = <messageConfig>{
    top: `100px`,
    duration: 2,
    maxCount: 3
}
message.config(messageConfig)
export default { message, router, api }
