import { Ref, ref } from "vue"
import { useStore, Store } from "vuex"
import * as Utils from "@/utils"
import api, { I } from "@/api"
import { message } from "ant-design-vue"
import { GlobalDataProps } from "@/store"

interface ReturnType {
    save: () => void
    publish: () => void
}
export default function (): ReturnType {
    const store: Store<GlobalDataProps> = useStore()
    const save = async () => {
        const container = document.getElementById("mobileBox")
        const cover = container ? await Utils.convertToImage(container) : ""
        const opt = {
            id: +store.state.page.currentPageId,
            elements: JSON.stringify(store.state.page.elements),
            cover
        }
        api.sceneApi.page.update(opt).then(() => {
            message.success("保存成功")
        })
    }
    const publish = () => {
        message.success("发布成功")
    }
    return {
        save,
        publish
    }
}
