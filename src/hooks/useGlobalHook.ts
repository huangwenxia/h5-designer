import { message } from "ant-design-vue"
import { useRouter, useRoute } from "vue-router"
import { useStore } from "vuex"
import api from "@/api"
// import * as I from "@/api/interface/index"

export const useGlobalHook = () => {
    const store = useStore()
    const router = useRouter()
    const route = useRoute()

    return { api, store, router, route, message }
}
