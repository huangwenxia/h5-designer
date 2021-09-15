export interface BaseResponse<T> {
    status?: number
    result?: T
    message?: string
}
export interface ListPageType<T> {
    rows: Array<T>
    count: number
}
