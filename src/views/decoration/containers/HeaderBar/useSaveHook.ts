import { Ref, ref } from "vue"
import { useStore, Store } from "vuex"
import * as Utils from "@/utils"
import api, { I } from "@/api"
import { message } from "ant-design-vue"
import { GlobalDataProps } from "@/store"

interface ReturnType {
    save: () => void
    publish: () => void
    preview: () => void
    detail: Ref<I.scene.listrow>
    previewVisible: Ref<boolean>
}
export default function (): ReturnType {
    const store: Store<GlobalDataProps> = useStore()
    const save = async () => {
        const container = document.getElementById("mobileBox")
        const cover = container ? await Utils.convertToImage(container) : ""
        const opt = {
            id: +store.state.page.currentPageId,
            elements: JSON.stringify(store.state.page.content),
            cover
        }
        api.sceneApi.page.update(opt).then(() => {
            message.success("保存成功")
        })
    }
    const detail: Ref<I.scene.listrow> = ref({ id: 0, title: "", desc: "", cover: "", music: "", status: 1, properties: "{}", viewCount: 0, creator: 1, createdAt: "", updatedAt: "" })
    const publish = () => {
        console.log("detail", detail.value)
        api.sceneApi.publish(detail.value.id).then(() => {
            message.success("发布成功")
        })
    }
    const previewVisible = ref(false)
    const preview = () => {
        previewVisible.value = true
    }
    return {
        save,
        publish,
        preview,
        detail,
        previewVisible
    }
}
