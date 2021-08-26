import { message } from "ant-design-vue"
import router from "@/router"
import api from "@/api/index"
import { Store, useStore, mapActions } from "vuex"
import { GlobalDataProps } from "@/store"
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
const store: Store<GlobalDataProps> = useStore()
export default { message, router, api, store, Store, mapActions }
