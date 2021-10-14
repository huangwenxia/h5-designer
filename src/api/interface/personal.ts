import { ListQueryType } from "@/api/interface/base"

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
    createdAt: string | number
    updatedAt: string | number
}
export interface baseRowParams extends ListQueryType {
    [key: string]: unknown
}
