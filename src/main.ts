import { createApp } from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import compos from "./components/global"
import Antd from "ant-design-vue"
import "ant-design-vue/dist/antd.css"
import api from "@/api/index"
const app = createApp(App)

app.config.globalProperties.$api = api

compos.forEach((a) => {
    app.component(a.name, a)
})

app.use(Antd).use(store).use(router).mount("#app")
