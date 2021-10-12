<template>
    <Header></Header>
    <div class="container">
        <div class="wrapper">
            <div class="post-content">
                <iframe :src="url + '?id=' + detail.id" frameborder="0"></iframe>
            </div>
            <div class="post-info">
                <div class="title">{{ detail.title }}</div>
                <div class="desc">{{ detail.desc }}</div>
                <div class="control">
                    <span><EyeOutlined /> {{ detail.viewCount }}</span>
                    <span class="btn" @click="copy"><PaperClipOutlined /> 复制链接</span>
                    <span class="btn" @click="addFav" v-if="!detail.isFav"><HeartOutlined /> 收藏</span>
                    <span class="btn red" v-else><HeartFilled /> 已收藏</span>
                </div>
                <div class="qr">
                    <div class="tit">手机扫一扫即可预览</div>
                    <div class="code"><canvas id="code"></canvas></div>
                </div>
                <div class="btns">
                    <a-button size="large" type="primary" @click="use">使用该摸版</a-button>
                </div>
            </div>
        </div>
    </div>
    <Footer></Footer>
</template>
<script lang="ts">
import { defineComponent, Ref, ref, onMounted } from "vue"
import Header from "@/components/layout/components/Header.vue"
import Footer from "@/components/layout/components/Footer.vue"
import { useRouter, useRoute } from "vue-router"
import api, { I } from "@/api"
import { EyeOutlined, PaperClipOutlined, HeartOutlined, HeartFilled } from "@ant-design/icons-vue"
import { message } from "ant-design-vue"
import useClipboard from "vue-clipboard3"
export default defineComponent({
    name: "Detail",
    components: {
        Header,
        Footer,
        EyeOutlined,
        PaperClipOutlined,
        HeartOutlined,
        HeartFilled
    },
    setup() {
        const route = useRoute()
        const router = useRouter()

        const detail: Ref<I.scene.detailrow> = ref({
            id: 0,
            title: "",
            desc: "",
            cover: "",
            music: "",
            status: 1,
            properties: "",
            viewCount: 0,
            isFav: false,
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
        const use = () => {
            router.push({
                path: "/decoration",
                query: {
                    id: detail.value.id
                }
            })
        }
        const addFav = () => {
            api.sceneApi.fav.save({ sceneId: detail.value.id }).then(() => {
                detail.value.isFav = true
                message.success("收藏成功")
            })
        }
        const url = process.env.NODE_ENV == "production" ? "/show" : "/show.html"
        const { toClipboard } = useClipboard()
        const copy = async () => {
            try {
                await toClipboard(location.origin + url + "?id=" + detail.value.id)
                message.success("复制成功")
            } catch (e) {
                message.info("复制失败，请尝试手动复制浏览器地址栏")
            }
        }
        //生成二维码
        const initQr = () => {
            var QRCode = require("qrcode")
            var canvas = document.getElementById("code")

            QRCode.toCanvas(canvas, location.origin + url + "?id=" + detail.value.id, { width: 200, height: 200 })
        }
        onMounted(() => {
            initQr()
        })

        return {
            use,
            url,
            detail,
            addFav,
            copy
        }
    }
})
</script>
<style scoped lang="scss">
.container {
    background: #f4f4f4;
    padding: 40px 0;
    .wrapper {
        background: #fff;
        padding: 40px;
        @include clearfix;
        .post-content {
            width: 375px;
            float: left;
            height: 470px;
            background: #fafafa;
            iframe {
                width: 100%;
                height: 100%;
            }
        }
        .post-info {
            margin-left: 500px;
            font-size: 16px;
            .title {
                font-size: 24px;
                margin-bottom: 20px;
            }
            .desc {
                margin-bottom: 20px;
                color: #666;
            }
            .control {
                margin-bottom: 20px;
                > span {
                    margin-right: 40px;
                    display: inline-block;
                    min-width: 100px;
                    color: #999;
                }
                .btn {
                    cursor: pointer;
                    &:hover {
                        color: $color-primary;
                    }
                    &.red {
                        color: $color-red;
                    }
                }
            }
            .qr {
                border-top: 1px solid #eee;
                padding-top: 20px;
                margin-bottom: 40px;
                .tit {
                    margin-bottom: 10px;
                    color: #999;
                    font-size: 14px;
                }
                .code {
                    width: 200px;
                    height: 200px;
                    background: #fafafa;
                }
            }
        }
    }
}
</style>
