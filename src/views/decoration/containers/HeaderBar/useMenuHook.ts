import { Ref, ref } from "vue"
import { useStore } from "vuex"
import * as Utils from "@/utils"
import moduledata from "../../moduledata"
import FileService from "@/components/FileService"
import { I } from "@/api"

interface MenuItemType {
    name: string
    icon: string
    value: string
}
type MenuType = Array<MenuItemType>

interface ReturnType {
    menuArray: Ref<MenuType>
    headerItem: (e: MenuItemType) => void
}
export default function (): ReturnType {
    const store = useStore()
    const menuArray: Ref<MenuType> = ref([
        { name: "文本", icon: "FontSizeOutlined", value: "text" },
        { name: "图片", icon: "PictureOutlined", value: "image" },
        { name: "视频", icon: "PlaySquareOutlined", value: "video" },
        { name: "音乐", icon: "PlaySquareOutlined", value: "audio" }
    ])
    const headerItem = (e: MenuItemType) => {
        if (e.value == "text") {
            const data = Utils.deepClone(moduledata.text)
            data.id = "element_" + Utils.genNonDuplicateID(6)
            store.commit("elementAdd", data)
        } else {
            FileService({
                type: e.value,
                success: (files: Array<I.file.baseRow>) => {
                    console.log("调了success", files)
                    const data = Utils.deepClone(moduledata.image)
                    data.id = "element_" + Utils.genNonDuplicateID(6)
                    data.attrs.src = files[0].url
                    store.commit("elementAdd", data)
                }
            })
        }
    }
    return {
        menuArray,
        headerItem
    }
}
