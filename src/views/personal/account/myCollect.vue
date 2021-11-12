<template>
    <div class="my-works">
        <Spin :spinning="loading">
            {{list}}
            <a-table v-if="list.length" :dataSource="list.map(item=>item.scene)" :columns="columns" :rowKey="(record,index)=>{return index}">
                <template #cover="{ cover }" >
                    <a-image :width="40" :src="cover"></a-image>
                </template>
                <template #title="{ title }">
                    <a>{{ title }}</a>
                </template>
                <template #action>
                        <span>
                          <a>查看数据</a>
                        </span>
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
import { Pagination, Spin } from "ant-design-vue"
import * as I from "@/api/interface"
import { useListPageHook } from "@/hooks/useListPageHook"
import api from "@/api"

export default defineComponent({
    name: "MyWorks",
    components: { Pagination, Spin },
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
                dataIndex: "cover",
                key: "cover"
            },
            {
                title: "作品名称",
                dataIndex: "title",
                key: "title"
            },
            {
                title: "预览量",
                dataIndex: "viewCount",
                key: "viewCount"
            },
            {
                title: "操作",
                dataIndex: "action",
                key: "action"
            }
        ])
        return {
            list,
            total,
            loading,
            loadData,
            listQuery,
            columns,
        }
    }
})
</script>
