import { ListQueryType } from "@/api/interface/base"
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
export interface baseRow {
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

export interface baseRowParams extends ListQueryType {
    [key: string]: unknown
}
