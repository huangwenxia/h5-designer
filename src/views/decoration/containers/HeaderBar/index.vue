<template>
    <div class="decoration-header">
        <div class="logo">
            <router-link to="/personal"
                ><a-image :width="40" :src="require('@/assets/logo.png')" :preview="false" /><span class="txt">{{ detail.title }}</span></router-link
            >
        </div>
        <ul class="header-list">
            <li class="header-item" @click="headerItem(item)" v-for="(item, index) in menuArray" :key="index">
                <component :is="item.icon" class="icon"></component>
                <div>{{ item.name }}</div>
            </li>
            <!-- <li class="item item-active" :style="{ transform: 'translateY(' + menutab * 100 + '%)' }"><div class="active-border"></div></li> -->
        </ul>
        <div class="controls">
            <a-button type="default" shape="round" @click="preview">预览</a-button>
            <a-button type="primary" shape="round" @click="save">保存</a-button>
            <a-button type="primary" :danger="true" shape="round" @click="publish">发布</a-button>
        </div>
    </div>
    <a-modal v-model:visible="previewVisible" title="预览" width="100%" wrapClassName="full-modal" :footer="null">
        <div class="phone-box" v-if="previewVisible">
            <iframe :src="url + '?id=' + detail.id + '&mode=edit'" frameborder="0"></iframe>
        </div>
    </a-modal>
</template>
<script lang="ts">
import { defineComponent, PropType, watch } from "vue"
import useMenuHook from "./useMenuHook"
import useSaveHook from "./useSaveHook"
import { FontSizeOutlined, PictureOutlined, PlaySquareOutlined } from "@ant-design/icons-vue"
import { I } from "@/api"

const props = {
    detail: {
        type: Object as PropType<I.scene.listrow>,
        default() {
            return {}
        }
    }
}
export default defineComponent({
    components: { FontSizeOutlined, PictureOutlined, PlaySquareOutlined },
    props,
    setup(props) {
        const { menuArray, headerItem } = useMenuHook()
        const { save, publish, preview, detail, previewVisible } = useSaveHook()
        watch(
            () => props.detail,
            (val) => {
                detail.value = val
            }
        )
        const url = process.env.NODE_ENV == "production" ? "/show" : "/show.html"

        return {
            menuArray,
            headerItem,
            save,
            publish,
            preview,
            previewVisible,
            url
        }
    }
})
</script>
<style scoped lang="scss">
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
    .controls {
        float: right;
        .ant-btn {
            margin-left: 10px;
        }
    }
}
</style>
<style lang="scss">
.full-modal {
    .ant-modal {
        max-width: 100%;
        top: 0;
        padding-bottom: 0;
        margin: 0;
    }
    .ant-modal-header {
        background: none;
        color: #fff;
        border: none;
        .ant-modal-title {
            color: #fff;
        }
    }
    .ant-modal-content {
        display: flex;
        flex-direction: column;
        height: calc(100vh);
        background: rgba(0, 0, 0, 0.5);
        .ant-modal-close {
            color: #fff;
        }
    }
    .ant-modal-body {
        flex: 1;
    }
    .phone-box {
        width: 375px;
        height: 570px;
        background: #fff;
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
        margin: 30px auto;
        iframe {
            width: 100%;
            height: 100%;
        }
    }
}
</style>
