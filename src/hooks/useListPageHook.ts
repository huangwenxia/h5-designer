import { Ref, ref } from "vue"
import { BaseResponse, ListPageType } from "@/api/interface/base"

import * as I from "@/api/interface/index"
interface LoadParamsType<T> {
    api: (listQuery: I.base.ListQueryType) => Promise<BaseResponse<ListPageType<T>>>
    params?: {
        // [key: string]: string | number | boolean | null | undefined | unknown
        [key: string]: unknown
    }
}
interface ReturnType<T> {
    total: Ref<number | undefined>
    list: Ref<Array<T> | undefined>
    listQuery: Ref<I.base.ListQueryType>
    loading: Ref<boolean>
    loadData: () => void
}
export function useListPageHook<T>(opt: LoadParamsType<T>): ReturnType<T> {
    const loading = ref(false)
    const total = ref<number | undefined>(0)
    const list: Ref<Array<T> | undefined> = ref([])
    const listQuery = ref({
        page: 1,
        pageSize: 10,
        ...opt.params
    })
    const loadData = () => {
        loading.value = true
        opt.api(listQuery.value)
            .then((res) => {
                list.value = res?.result?.rows
                total.value = res?.result?.count
            })
            .finally(() => {
                loading.value = false
            })
    }
    return {
        total,
        list,
        listQuery,
        loading,
        loadData
    }
}
