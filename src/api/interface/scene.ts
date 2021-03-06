import { ListQueryType } from "@/api/interface/base"

export interface listrow {
    id: number
    title: string
    desc: string
    cover: string
    music: string
    status: number
    properties: string
    viewCount: number
    creator: number
    createdAt: string
    updatedAt: string
}
export interface homelistrow extends listrow {
    user: {
        name: string
        avatar: null | string
        username: string
    }
}

export interface homelistparam extends ListQueryType {
    [key: string]: unknown
}

export interface saveparam {
    title: string
    desc?: string
    cover?: string
    music?: string
    properties?: string
}
export interface detailrow extends listrow {
    isFav: boolean
}
