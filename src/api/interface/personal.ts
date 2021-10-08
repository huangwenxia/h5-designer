// import { IResponse } from "@/api/interface/common"

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
