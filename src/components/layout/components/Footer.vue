<template>
    <div class="footer-container">
        <div class="web-content clearfix">
            <ul class="box" v-for="key in [1, 2, 3, 4]" :key="key">
                <li class="item" v-for="(val, index) in webList" :key="index">
                    {{ val }}
                </li>
            </ul>
        </div>
        <div class="copy-right">©2021 h5.tucy.top.All rights reserved万博智云软件科技（武汉）有限公司</div>
    </div>
</template>

<script>
import { defineComponent, ref } from "vue"
export default defineComponent({
    name: "Footer",
    setup() {
        const webList = ref(["H5设计平台", "作品审核", "网站地图", "代码仓库", "帮助"])
        return {
            webList
        }
    }
})
</script>

<style scoped lang="scss">
@import "@/assets/css/variables.scss";
.footer-container {
    width: 100%;
    .web-content {
        height: 330px;
        background-color: $black-pale;
        .box {
            float: left;
            width: 25%;
            padding-left: 5%;
        }
        .item {
            color: $gray-2;
            margin-bottom: 10px;
            &:first-child {
                font-weight: 700;
                margin: 30px 0;
                color: #ffffff;
            }
        }
    }
    .copy-right {
        height: 80px;
        line-height: 80px;
        background-color: $black-dark;
        text-align: center;
    }
}
</style>
