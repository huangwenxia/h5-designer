<template>
    <Header></Header>
    <div class="container">
        <div class="wrapper">
            <div class="post-content"></div>
            <div class="post-info">
                <div class="title">互联网科技招聘</div>
                <div class="desc">这里是简介内容</div>
                <div class="control">
                    <span><EyeOutlined /> 1023</span>
                    <span class="btn"><PaperClipOutlined /> 复制链接</span>
                    <span class="btn"><HeartOutlined /> <HeartFilled /> 收藏</span>
                </div>
                <div class="qr">
                    <div class="tit">手机扫一扫即可预览</div>
                    <div class="code"></div>
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
import { defineComponent } from "vue"
import Header from "@/components/layout/components/Header.vue"
import Footer from "@/components/layout/components/Footer.vue"
import { useRouter } from "vue-router"
import { EyeOutlined, PaperClipOutlined, HeartOutlined, HeartFilled } from "@ant-design/icons-vue"
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
        const router = useRouter()
        const use = () => {
            router.push({
                path: "/decoration"
            })
        }
        return {
            use
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
            width: 450px;
            float: left;
            height: 600px;
            background: #fafafa;
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
