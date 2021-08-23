<template>
    <div class="home-page">
        <a-layout>
            <a-layout-header class="header">
                <Header></Header>
            </a-layout-header>
            <section class="home-carousel">
                <a-carousel :after-change="onChange">
                    <div style="height: 100%" v-for="i in [1, 2, 3, 4]" :key="i">
                        <h3>{{ i }}</h3>
                    </div>
                </a-carousel>
            </section>
            <section class="home-part2">
                <a-row>
                    <a-col class="box" v-for="(item, i) in part2Data" :span="8" :key="i">
                        <div>
                            <a-image
                                :width="60"
                                :height="80"
                                :src="item.img"
                                fallback="data:image/png;base64,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"
                            />
                        </div>
                        <h1>{{ item.text }}</h1>
                        <h4>{{ item.desc }}</h4>
                    </a-col>
                </a-row>
            </section>
            <section class="home-part3">
                <h1 class="title">H5广场</h1>

                <div class="list">
                    <a-row type="flex" justify="center" :gutter="[16, 16]">
                        <a-col :span="6" v-for="(item, i) in part3Data" :key="i">
                            <div class="box">
                                <div class="box-img">
                                    <a-image width="100%" :src="item.img"></a-image>
                                </div>
                                <div class="box-info">
                                    <h4 class="sub-title">{{ item.title }}</h4>
                                    <div class="info clearfix">
                                        <a-avatar class="username">
                                            <template #icon>
                                                <a-image :width="60" :height="80" :src="item.avatar"></a-image>
                                            </template>
                                            {{ item.username }}
                                        </a-avatar>
                                        <div class="number">
                                            <eye-outlined />
                                            {{ item.number }}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </a-col>
                    </a-row>
                </div>
                <div class="pagination">
                    <a-pagination v-model:current="current" :total="50" show-less-items />
                </div>
            </section>
            <a-layout-footer>
                <Footer></Footer>
            </a-layout-footer>
        </a-layout>
    </div>
</template>

<script lang="ts">
import Header from "@/components/layout/components/Header.vue"
import Footer from "@/components/layout/components/Footer.vue"
import { defineComponent, reactive, ref, inject } from "vue"
import { EyeOutlined } from "@ant-design/icons-vue"
export default defineComponent({
    name: "Home",
    components: {
        Header,
        Footer,
        EyeOutlined
    },

    setup() {
        const { message } = inject("$ctx") as any
        message.info("1111")
        const onChange = (current: number) => {
            console.log(current)
        }
        const part2Data = ref([
            { img: "", text: "专注H5始终如一", desc: "三年保持行业领先" },
            { img: "", text: "海量 H5 模板", desc: "一键生成，一分钟轻松制作" },
            { img: "", text: "极致体验", desc: "用户的一致选择" }
        ])

        let data = new Array(8).fill({ img: require("@/assets/images/prd.png"), title: "互联网科技邀请函", username: "用户A", number: 66, avatar: require("@/assets/images/prd.png") })
        const part3Data = reactive(data)
        return {
            part2Data,
            part3Data,
            onChange,
            current: 2
        }
    }
})
</script>
<style lang="scss" scoped>
@import "@/assets/css/variables.scss";
.home-page {
    width: 100%;
}
.home-page .header {
    background: #ffffff;
    position: relative;
    z-index: 1110;
    border-bottom: 1px solid #ddd;
    padding: 0 25px;
}
.home-page .home-part2 {
    height: 200px;
    background-color: $gray-3;
    .box {
        text-align: center;
        margin-top: 20px;
    }
}
.home-page .home-part3 {
    background-color: #ffffff;
    padding: 0 200px 30px;
    .title {
        padding: 40px;
        text-align: center;
    }
    .list {
        .box {
            text-align: center;
            .sub-title {
                padding: 16px 0;
            }
            .box-info {
                border: 1px solid #dddddd;
                padding-bottom: 10px;
                .info {
                    width: 100%;
                    .username {
                        float: left;
                        margin-left: 16px;
                    }
                    .number {
                        float: right;
                        margin-right: 16px;
                        font-size: 16px;
                    }
                }
            }
        }
    }
    .pagination {
        margin-top: 20px;
        text-align: center;
    }
}
.ant-layout-footer {
    padding: 0;
}
.ant-carousel :deep(.slick-slide) {
    text-align: center;
    height: 400px;
    line-height: 400px;
    background: #364d79;
    overflow: hidden;
}

.ant-carousel :deep(.slick-slide h3) {
    color: #fff;
}
</style>
