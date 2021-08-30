<template>
    <div class="decoration">
        <div class="decoration-header">
            <div class="logo"><span class="txt">H5设计平台</span></div>
            <ul class="header-list">
                <li class="header-item" @click="headerItem(item)" v-for="(item, index) in menuArray" :key="index">
                    <component :is="item.icon" class="icon"></component>
                    <div>{{ item.name }}</div>
                </li>
                <!-- <li class="item item-active" :style="{ transform: 'translateY(' + menutab * 100 + '%)' }"><div class="active-border"></div></li> -->
            </ul>
        </div>
        <a-modal v-model:visible="visible" title="图片上传" @ok="handleOk">
            <file></file>
        </a-modal>
        <SiderBar></SiderBar>
        <MobileBox></MobileBox>
        <editPanels></editPanels>
    </div>
</template>

<script lang="ts">
import SiderBar from "./containers/SiderBar/index.vue"
import MobileBox from "./containers/MobileBox.vue"
import { defineComponent, ref, Ref } from "vue"
import { useStore, Store } from "vuex"
import { FontSizeOutlined, PictureOutlined, PlaySquareOutlined } from "@ant-design/icons-vue"
import { GlobalDataProps } from "@/store"
import * as Utils from "@/utils"
import moduledata from "./moduledata"
import editPanels from "./editPanels/index.vue"
import file from "./components/file.vue"

interface MenuItemType {
    name: string
    icon: string
    value: string
}
type MenuType = Array<MenuItemType>

export default defineComponent({
    components: { SiderBar, MobileBox, FontSizeOutlined, PictureOutlined, PlaySquareOutlined, editPanels, file },
    setup() {
        const visible = ref<boolean>(false)
        const menuArray: Ref<MenuType> = ref([
            { name: "文本", icon: "FontSizeOutlined", value: "text" },
            { name: "图片", icon: "PictureOutlined", value: "img" },
            { name: "视频", icon: "PlaySquareOutlined", value: "video" },
            { name: "音乐", icon: "PlaySquareOutlined", value: "music" }
        ])
        const modules = ref([])
        var headerItem = (e: MenuItemType) => {
            if (e.value == "text") {
                let data = Utils.deepClone(moduledata.text)
                data.id = "element_" + Utils.genNonDuplicateID(6)
                store.commit("elementAdd", data)
            } else if (e.value == "img") {
                visible.value = true
            }
        }
        const store: Store<GlobalDataProps> = useStore()
        const moduleList = store.state.page.elements
        const handleOk = () => {
            visible.value = false
        }
        return {
            menuArray,
            modules,
            headerItem,
            moduleList,
            visible,
            handleOk
        }
    }
})
</script>

<style scoped lang="scss">
.decoration {
    background: #f2f2f2;
    padding-top: 60px;
    min-height: 100vh;
    .decoration-header {
        height: 60px;
        line-height: 60px;
        padding: 0 20px;
        border-bottom: 1px solid #ddd;
        position: fixed;
        top: 0;
        width: 100%;
        top: 0;
        z-index: 99;
        background: #fff;
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
        .logo {
            float: left;
            .txt {
                margin-left: 30px;
                color: #666;
            }
        }
        .header-list {
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            .header-item {
                height: 60px;
                display: inline-block;
                vertical-align: top;
                line-height: 1.5;
                padding: 10px 20px;
                font-weight: bold;
                color: #464646;
                text-align: center;
                cursor: pointer;
                .icon {
                    font-size: 20px;
                }
                &:hover {
                    background-color: #1593ff;
                    color: #fff;
                }
            }
        }
    }
}
</style>
