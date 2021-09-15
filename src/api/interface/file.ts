export interface UploadResponseResult {
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
