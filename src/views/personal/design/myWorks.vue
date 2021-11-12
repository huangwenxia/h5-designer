<template>
    <div class="my-works">
        <div class="filter-control"><a-button type="primary" @click="add">添加作品</a-button></div>
        <Spin :spinning="loading">
            <div class="content">
                <div class="work-list" v-if="list.length">
                    <div class="item" v-for="(item, i) in list" :key="i">
                        <div class="box">
                            <a-image
                                :src="item.cover"
                                :preview="false"
                                fallback="data:image/png;base64,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"
                            />
                            <div class="info">
                                <div class="title">{{ item.title }}</div>
                                <div class="other clearfix">
                                    <div class="createdAt">
                                        {{ item.createdAt }}
                                    </div>
                                    <div class="number">
                                        <eye-outlined />
                                        {{ item.viewCount }}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="modal">
                            <div class="bg"></div>
                            <div class="preview">
                                <div class="pre-btn" @click="preview(item)">预览</div>
                            </div>
                            <div class="actions">
                                <a-button type="text" @click="edit(item)">
                                    <EditOutlined />
                                    <br />
                                    编辑
                                </a-button>
                                <a-button type="text" @click="remove(item)">
                                    <DeleteOutlined />
                                    <br />
                                    删除
                                </a-button>
                            </div>
                        </div>
                    </div>
                </div>
                <Empty :image="simpleImage" v-if="!loading && !list.length" />
            </div>
        </Spin>
        <div class="page">
            <Pagination v-model:current="listQuery.page" :total="total" @change="loadData" />
        </div>
    </div>
    <addWorkDialog ref="addWorkDialogRef" @refresh="loadData" />
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, Ref } from "vue"
import { useRouter } from "vue-router"
import { Pagination, Empty, Spin, Modal, message } from "ant-design-vue"
import * as I from "@/api/interface"
import api from "@/api"
import { useListPageHook } from "@/hooks/useListPageHook"
import { EyeOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons-vue"
import addWorkDialog from "./addWorkDialog.vue"
import { addWorkHook } from "./addWorkHook"

export default defineComponent({
    name: "MyWorks",
    components: { Pagination, Empty, Spin, EyeOutlined, DeleteOutlined, EditOutlined, addWorkDialog },
    setup() {
        const router = useRouter()
        const listQuery: Ref<I.scene.homelistparam> = ref({
            page: 1,
            pageSize: 10
        })
        const { total, loading, list, loadData } = useListPageHook<I.personal.baseRow, I.personal.baseRowParams>({
            api: api.personalApi.list,
            params: listQuery.value
        })
        const actionShow: Ref<boolean> = ref(false)
        onMounted(() => {
            setTimeout(() => {
                loadData()
            })
        })
        const { addWorkDialogRef, add } = addWorkHook()
        const edit = (data: I.scene.listrow): void => {
            var local = router.resolve({
                path: "/decoration",
                query: {
                    id: data.id
                }
            })
            window.open(local.href, "_blank")
        }
        const preview = (data: I.scene.listrow): void => {
            const url = process.env.NODE_ENV == "production" ? "/show" : "/show.html"
            window.open(url + "?id=" + data.id, "_blank")
        }
        const remove = (data: I.scene.listrow): void => {
            Modal.confirm({
                title: "确认删除[" + data.title + "]吗?",
                onOk() {
                    api.sceneApi.remove(data.id).then(() => {
                        message.success("删除成功")
                        loadData()
                    })
                }
            })
        }
        return {
            list,
            actionShow,
            total,
            loading,
            listQuery,
            loadData,
            simpleImage: Empty.PRESENTED_IMAGE_SIMPLE,
            addWorkDialogRef,
            preview,
            add,
            edit,
            remove
        }
    }
})
</script>
<style scoped lang="scss">
.page {
    margin-top: 40px;
}
.work-list {
    :deep(.ant-image) {
        .ant-image-img {
            height: 278px;
        }
    }
    :deep(.ant-btn) {
        height: 0;
    }
    @include clearfix;
    .item {
        width: 200px;
        position: relative;
        float: left;
        margin: 0 20px 20px 0;
        &:hover {
            cursor: pointer;
            .modal {
                visibility: visible;
                .actions {
                    transform: translateY(0);
                }
                .bg {
                    opacity: 1;
                }
            }
        }
        .box {
            border: 1px solid $color-border;
            .info {
                width: 100%;
                border-top: 1px solid $color-border;
                .title {
                    text-align: center;
                    padding: 5px 5px;
                    height: 28px;
                    line-height: 28px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
                .other {
                    padding: 6px 5px;
                    color: #999;
                    .createdAt {
                        float: left;
                        margin-left: 5px;
                    }
                    .number {
                        float: right;
                        margin-right: 5px;
                    }
                }
            }
        }
        .modal {
            visibility: hidden;
            transition: all 0.3s ease;
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            overflow: hidden;
            .bg {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background-color: rgba(0, 0, 0, 0.5);
                z-index: 1;
                transition: all 0.3s;
                opacity: 0;
            }

            .preview {
                position: absolute;
                z-index: 2;
                display: block;
                width: 100%;
                text-align: center;
                .pre-btn {
                    display: inline-block;
                    color: #ffffff;
                    border: 1px solid #ffffff;
                    border-radius: 8px;
                    padding: 5px 20px;
                    margin-top: 120px;
                }
            }
            .actions {
                position: absolute;
                padding: 20px 0;
                width: 100%;
                text-align: center;
                bottom: 0;
                opacity: 1;
                border: 1px solid #dddddd;
                background-color: #ffffff;
                z-index: 2;

                transition: all 0.3s;
                transform: translateY(100%);

                :deep(.ant-btn) {
                    top: -12px;
                }
            }
        }
    }
}
</style>
