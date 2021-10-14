export interface BaseResponse<T> {
    status: number
    result: T
    message?: string
}
export interface ListPageType<T> {
    rows: Array<T>
    count: number
}

export interface ListQueryType {
    page: string | number
    pageSize: string | number
    type?: string
}

// export interface ListQueryParams<T, S> {
//     [key: string]: T & S
// }

export interface BaseMessageConfig {
    content?: string
    top?: string
    duration?: number
    maxCount?: number
}
