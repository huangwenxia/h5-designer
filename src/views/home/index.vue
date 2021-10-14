<template>
    <div class="home-page">
        <a-layout>
            <Header></Header>
            <section class="home-carousel">
                <a-carousel :after-change="onChange">
                    <div v-for="i in [1, 2]" :key="i" style="vertical-align: top">
                        <div class="carousel-item" :style="'background-image:url(' + require('@/assets/images/banner' + i + '.jpg') + ')'">
                            <div class="content">
                                <h2>免费好用的H5制作工具</h2>
                                <h3>创意新颖，动画炫酷，制作简单</h3>
                            </div>
                        </div>
                    </div>
                </a-carousel>
            </section>
            <section class="home-part2">
                <div class="wrapper">
                    <a-row>
                        <a-col class="box" v-for="(item, i) in part2Data" :span="8" :key="i">
                            <div>
                                <svg v-if="i === 0" class="" data-icon="html5" width="1em" height="1em" fill="currentColor" aria-hidden="true" viewBox="64 64 896 896" focusable="false">
                                    <path d="M145 96l66 746.6L511.8 928l299.6-85.4L878.7 96H145zm610.9 700.6l-244.1 69.6-245.2-69.6-56.7-641.2h603.8l-57.8 641.2z" fill="#1890ff"></path>
                                    <path
                                        d="M209.9 155.4l56.7 641.2 245.2 69.6 244.1-69.6 57.8-641.2H209.9zm530.4 117.9l-4.8 47.2-1.7 19.5H381.7l8.2 94.2H511v-.2h214.7l-3.2 24.3-21.2 242.2-1.7 16.3-187.7 51.7v.4h-1.7l-188.6-52-11.3-144.7h91l6.5 73.2 102.4 27.7h.8v-.2l102.4-27.7 11.4-118.5H511.9v.1H305.4l-22.7-253.5L281 249h461l-1.7 24.3z"
                                        fill="#e6f7ff"
                                    ></path>
                                    <path d="M281 249l1.7 24.3 22.7 253.5h206.5v-.1h112.9l-11.4 118.5L511 672.9v.2h-.8l-102.4-27.7-6.5-73.2h-91l11.3 144.7 188.6 52h1.7v-.4l187.7-51.7 1.7-16.3 21.2-242.2 3.2-24.3H511v.2H389.9l-8.2-94.2h352.1l1.7-19.5 4.8-47.2L742 249H511z" fill="#1890ff"></path>
                                </svg>
                                <svg v-if="i === 1" class="" data-icon="build" width="1em" height="1em" fill="currentColor" aria-hidden="true" viewBox="64 64 896 896" focusable="false">
                                    <path d="M144 546h200v200H144zm268-268h200v200H412z" fill="#e6f7ff"></path>
                                    <path
                                        d="M916 210H376c-17.7 0-32 14.3-32 32v236H108c-17.7 0-32 14.3-32 32v272c0 17.7 14.3 32 32 32h540c17.7 0 32-14.3 32-32V546h236c17.7 0 32-14.3 32-32V242c0-17.7-14.3-32-32-32zM344 746H144V546h200v200zm268 0H412V546h200v200zm0-268H412V278h200v200zm268 0H680V278h200v200z"
                                        fill="#1890ff"
                                    ></path>
                                </svg>
                                <svg v-if="i === 2" class="" data-icon="bulb" width="1em" height="1em" fill="currentColor" aria-hidden="true" viewBox="64 64 896 896" focusable="false">
                                    <path d="M512 136c-141.4 0-256 114.6-256 256 0 92.5 49.4 176.3 128.1 221.8l35.9 20.8V752h184V634.6l35.9-20.8C718.6 568.3 768 484.5 768 392c0-141.4-114.6-256-256-256z" fill="#e6f7ff"></path>
                                    <path
                                        d="M632 888H392c-4.4 0-8 3.6-8 8v32c0 17.7 14.3 32 32 32h192c17.7 0 32-14.3 32-32v-32c0-4.4-3.6-8-8-8zM512 64c-181.1 0-328 146.9-328 328 0 121.4 66 227.4 164 284.1V792c0 17.7 14.3 32 32 32h264c17.7 0 32-14.3 32-32V676.1c98-56.7 164-162.7 164-284.1 0-181.1-146.9-328-328-328zm127.9 549.8L604 634.6V752H420V634.6l-35.9-20.8C305.4 568.3 256 484.5 256 392c0-141.4 114.6-256 256-256s256 114.6 256 256c0 92.5-49.4 176.3-128.1 221.8z"
                                        fill="#1890ff"
                                    ></path>
                                </svg>
                            </div>
                            <h1>{{ item.text }}</h1>
                            <h4>{{ item.desc }}</h4>
                        </a-col>
                    </a-row>
                </div>
            </section>
            <section class="home-part3">
                <div class="wrapper">
                    <h1 class="title">H5广场</h1>
                    <a-spin :spinning="loading">
                        <div class="list">
                            <a-row type="flex" :gutter="[20, 20]">
                                <a-col :span="6" v-for="(item, i) in list" :key="i">
                                    <div class="box" @click="toDetail(item)">
                                        <div class="box-img">
                                            <img class="img" :src="item.cover" />
                                        </div>
                                        <div class="box-info">
                                            <h4 class="sub-title">{{ item.title }}</h4>
                                            <div class="info clearfix">
                                                <a-avatar class="username">
                                                    <template #icon>
                                                        <a-image :width="60" :height="80" :src="item.user.avatar" v-if="item.user.avatar" :preview="false"></a-image>
                                                        <UserOutlined v-else />
                                                    </template>
                                                </a-avatar>
                                                <span class="name">{{ item.user.name || item.user.username }}</span>
                                                <div class="number">
                                                    <eye-outlined />
                                                    {{ item.viewCount }}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </a-col>
                            </a-row>
                        </div>
                        <div class="pagination">
                            <a-pagination v-model:current="listQuery.page" :total="total" show-less-items @change="loadData" />
                        </div>
                    </a-spin>
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
import { defineComponent, onMounted, reactive, ref, Ref } from "vue"
import { EyeOutlined, UserOutlined } from "@ant-design/icons-vue"
import { useRouter } from "vue-router"
import api, { I } from "@/api"
import { useListPageHook } from "@/hooks/useListPageHook"
interface PosterItem {
    id: number
    img: string
    title: string
    username: string
    number: number
    avatar: string
}
export default defineComponent({
    name: "Home",
    components: {
        Header,
        Footer,
        EyeOutlined,
        UserOutlined
    },

    setup() {
        const router = useRouter()
        const onChange = (current: number) => {
            console.log(current)
        }
        const part2Data = ref([
            { img: "", text: "专注H5始终如一", desc: "三年保持行业领先" },
            { img: "", text: "丰富的动画", desc: "一键生成，一分钟轻松制作" },
            { img: "", text: "极致体验", desc: "用户的一致选择" }
        ])
        let data = new Array(8).fill({ img: require("@/assets/images/prd.png"), title: "互联网科技邀请函", username: "用户A", number: 66, avatar: require("@/assets/images/prd.png") })
        const part3Data = reactive(data)

        const toDetail = (data: PosterItem): void => {
            router.push({
                path: "/detail",
                query: {
                    id: data.id
                }
            })
        }
        const listQuery: Ref<I.scene.homelistparam> = ref({
            page: 1,
            pageSize: 10
        })
        const { total, loading, list, loadData } = useListPageHook<I.scene.homelistrow, I.scene.homelistparam>({
            api: api.sceneApi.homelist,
            params: listQuery.value
        })

        onMounted(() => {
            setTimeout(() => {
                loadData()
            })
        })
        return {
            part2Data,
            part3Data,
            onChange,
            current: 2,
            toDetail,
            total,
            loading,
            list,
            listQuery,
            loadData
        }
    }
})
</script>
<style lang="scss" scoped>
@import "@/assets/css/variables.scss";
.home-page {
    width: 100%;
}
.home-page .home-part2 {
    background-color: $gray-4;
    padding: 40px 0;
    .box {
        text-align: center;
        margin-top: 20px;
        svg {
            width: 60px;
            height: 60px;
        }
        h1 {
            font-size: 20px;
        }
        h4 {
            color: #777;
        }
    }
}
.home-page .home-part3 {
    background-color: #ffffff;
    padding: 50px 0;
    .title {
        text-align: center;
        margin-bottom: 50px;
        font-size: 24px;
    }
    .list {
        .box {
            cursor: pointer;
            transition: all 0.3s;
            border: 1px solid $color-border;
            border-radius: $radius;
            &:hover {
                transform: translateY(-10px);
            }
            .sub-title {
                padding: 15px;
            }
            .img {
                width: 100%;
                height: 300px;
            }
            .box-info {
                border-top: 1px solid $color-border;
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
                    .name {
                        vertical-align: middle;
                        margin-left: 10px;
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
.home-carousel {
    .carousel-item {
        height: 100%;
        position: relative;
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center center;
        height: 400px;
        &:after {
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            background: rgba(0, 0, 0, 0.5);
            content: "";
            display: block;
        }
        .content {
            width: 1000px;
            margin: 0 auto;
            padding: 80px 0;
            color: #fff;
            font-size: 30px;
            position: relative;
            z-index: 10;
            h2,
            h3 {
                color: #fff;
            }
        }
    }
    :deep(.slick-slide div) {
        vertical-align: top;
    }
}
</style>
