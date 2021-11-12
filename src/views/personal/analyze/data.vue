<template>
    <div class="my-works">
        <Spin :spinning="loading">
            <a-table v-if="list.length" :dataSource="list" :columns="columns" :rowKey="(record,index)=>{return index}">
                <template #cover="{text:scene}" >
                    <a-image :width="40" :src="scene['cover']"></a-image>
                </template>
                <template #title="{ text:scene }">
                    <a>{{scene && scene.title}}</a>
                </template>
                <template #viewCount="{ text:scene }">
                    <a>{{scene && scene.viewCount}}</a>
                </template>
                <template #action="{record}">
                    <a @click.stop="look(record)">查看数据</a>
                </template>
            </a-table>
        </Spin>
        <!--        <div class="page">-->
        <!--            <Pagination v-model:current="listQuery.page" :total="total" @change="loadData" />-->
        <!--        </div>-->
    </div>
</template>

<script lang="ts">
    import { defineComponent, onMounted, ref, Ref } from "vue"
    import { Pagination, Spin, } from "ant-design-vue"
    import * as I from "@/api/interface"
    import { useListPageHook } from "@/hooks/useListPageHook"
    import api from "@/api"

    export default defineComponent({
        name: "MyWorks",
        components: {  Spin },
        setup() {
            const listQuery: Ref<I.scene.homelistparam> = ref({
                page: 1,
                pageSize: 10
            })
            const { total, loading, list, loadData } = useListPageHook<I.personal.favRow<I.personal.baseRow>, I.personal.baseRowParams>({
                api: api.personalApi.listFav,
                params: listQuery.value
            })
            onMounted(() => {
                setTimeout(() => {
                    loadData()
                })
            })
            const columns = ref([
                {
                    title: "作品封面图",
                    dataIndex: "scene",
                    key: "cover",
                    slots: { customRender: 'cover' },
                },
                {
                    title: "作品名称",
                    dataIndex: "scene",
                    key: "title",
                    slots: { customRender: 'title' },
                },
                {
                    title: "预览量",
                    dataIndex: "scene",
                    key: "viewCount",
                    slots: { customRender: 'viewCount' },
                },
                {
                    title: "操作",
                    dataIndex: "action",
                    key: "action",
                    slots: { customRender: 'action' },
                }
            ])
            const look = (row:I.personal.baseRow)=>{
                console.log(row)
            }
            return {
                list,
                total,
                loading,
                loadData,
                listQuery,
                columns,
                look
            }
        }
    })
</script>
