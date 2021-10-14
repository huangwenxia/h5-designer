import { Ref, ref } from "vue"
import { BaseResponse, ListPageType } from "@/api/interface/base"

interface LoadParamsType<T, S> {
    api: (listQuery?: S) => Promise<BaseResponse<ListPageType<T>>>
    params?: S
    // params?: {
    //     // [key: string]: string | number | boolean | null | undefined | unknown
    //     [key: string]: unknown
    // }
}
interface ReturnType<T> {
    total: Ref<number | undefined>
    list: Ref<Array<T> | undefined>
    // listQuery: Ref<I.base.ListQueryType>
    loading: Ref<boolean>
    loadData: () => void
}

export function useListPageHook<T, S>(opt: LoadParamsType<T, S>): ReturnType<T> {
    const loading = ref(false)
    const total = ref<number | undefined>(0)
    const list: Ref<Array<T> | undefined> = ref([])
    const loadData = () => {
        loading.value = true
        opt.api(opt.params)
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
        // listQuery,
        loading,
        loadData
    }
}
