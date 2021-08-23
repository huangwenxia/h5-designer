import { createApp } from "vue"
import App from "./App.vue"
import router from "@/router"
import store from "@/store"
import compos from "@/components/global"
import Antd from "ant-design-vue"
import "@/assets/css/common.scss" // global css
import "ant-design-vue/dist/antd.css"
import { message } from "ant-design-vue"
const app = createApp(App)

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
compos.forEach((a) => {
    app.component(a.name, a)
})

app.provide("$ctx", { message, router }) //hwx:挂载全局对象及方法

app.use(Antd).use(store).use(router).mount("#app")
