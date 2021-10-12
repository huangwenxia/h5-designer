import * as I from "@/api/interface/index"
import axios from "@/api/interceptors"
import { BaseResponse, ListPageType } from "@/api/interface/base"

const homelist = (params?: I.scene.homelistparam): Promise<BaseResponse<ListPageType<I.scene.homelistrow>>> => {
    return axios.get("/api/scene/homelist", { params })
}
const list = (params?: I.scene.homelistparam): Promise<BaseResponse<ListPageType<I.scene.listrow>>> => {
    return axios.get("/api/scene/list", { params })
}
const detail = (id: number): Promise<BaseResponse<I.scene.detailrow>> => {
    return axios.get("/api/scene/" + id)
}
const save = (params: I.scene.saveparam): Promise<BaseResponse<undefined>> => {
    return axios.post("/api/scene/save", params)
}
const publish = (id: number): Promise<BaseResponse<undefined>> => {
    return axios.post("/api/scene/publish/" + id)
}
const remove = (id: number): Promise<BaseResponse<undefined>> => {
    return axios.delete("/api/scene/" + id)
}

import page from "./page"
import fav from "./fav"
export default { homelist, list, detail, save, page, remove, publish, fav }
