<template>
    <div class="decoration">
        <HeaderBar />
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
import HeaderBar from "./containers/HeaderBar/index.vue"
import { defineComponent, ref, Ref } from "vue"
import { useStore, Store } from "vuex"
import { GlobalDataProps } from "@/store"
import editPanels from "./editPanels/index.vue"
import file from "./components/file.vue"
import * as I from "@/api/interface/index"
import api from "@/api"
import { useRoute } from "vue-router"

export default defineComponent({
    components: { SiderBar, MobileBox, HeaderBar, editPanels, file },
    setup() {
        const route = useRoute()
        const visible = ref<boolean>(false)
        const modules = ref([])
        const store: Store<GlobalDataProps> = useStore()
        const moduleList = store.state.page.elements
        const handleOk = () => {
            visible.value = false
        }
        const detail: Ref<I.scene.listrow> = ref({
            id: 0,
            title: "",
            desc: "",
            cover: "",
            music: "",
            status: 1,
            properties: "{}",
            viewCount: 0,
            creator: 1,
            createdAt: "",
            updatedAt: ""
        })
        const getDetail = () => {
            const id = route.query.id || ""
            api.sceneApi.detail(+id).then((res) => {
                detail.value = res.result
            })
        }
        getDetail()
        return {
            modules,
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
}
</style>
