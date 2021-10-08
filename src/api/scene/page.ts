import * as I from "@/api/interface/index"
import axios from "@/api/interceptors"
import { BaseResponse } from "@/api/interface/base"

const list = (params?: I.scenePage.listparam): Promise<BaseResponse<Array<I.scenePage.listrow>>> => {
    return axios.get("/api/scene/page/list", { params })
}
const detail = (id: number): Promise<BaseResponse<I.scene.listrow>> => {
    return axios.get("/api/scene/page/" + id)
}
const save = (params: I.scenePage.saveparam): Promise<BaseResponse<undefined>> => {
    return axios.post("/api/scene/page/save", params)
}
const update = (params: I.scenePage.updateparam): Promise<BaseResponse<undefined>> => {
    const { id, ...opt } = params
    return axios.post("/api/scene/page/update/" + id, opt)
}
export default { list, detail, save, update }
