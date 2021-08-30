import { message } from "ant-design-vue"
import { useRouter, useRoute } from "vue-router"
import { useStore } from "vuex"
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

export const useGlobalHook = () => {
    const store = useStore()
    const router = useRouter()
    const route = useRoute()

    return { api, store, router, route, message }
}
