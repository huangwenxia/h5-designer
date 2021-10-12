import * as I from "@/api/interface/index"
import axios from "@/api/interceptors"
import { BaseResponse } from "@/api/interface/base"

const save = (params: I.sceneFav.saveparam): Promise<BaseResponse<undefined>> => {
    return axios.post("/api/scene/fav/save", params)
}
const remove = (id: number): Promise<BaseResponse<undefined>> => {
    return axios.delete("/api/scene/fav/" + id)
}
export default { save, remove }
