// import { IResponse } from "@/api/interface/common"

/**file相关 */
// export interface IUpload {
//     file: FormData | null | ""
// }

export interface UploadResponseResult {
    result: {
        id: string | number
        format: string
        url: string
        path: string
        size: number
        name: string
        type: string
        creator: string | number
        updatedAt: string
        createdAt: string
    }
}
export interface IUploadResponse {
    status: number
    result: UploadResponseResult | null
}
export interface IFileList {
    page: string | number
    pageSize: string | number
    type: string
}
export interface baseRow {
    id: string | number
    title: string
    desc: string
    cover: string
    music: string
    status: string | number
    properties: string
    viewCount: string | number
    creator: string | number
    createdAt: string
    updatedAt: string
}
export interface IFileListResponse {
    status: number
    result: {
        count: number
        rows: Array<baseRow>
    }
}
// export interface IFileRemoveResponse {
//     status: number
// }
