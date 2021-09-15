import * as I from "@/api/interface/index"
import axios from "@/api/interceptors"
import { genNonDuplicateID } from "@/utils"
import { AxiosPromise } from "axios"
import { BaseResponse, ListPageType } from "@/api/interface/base"

const upload = (formData: FormData, onUploadProgress?: (e: ProgressEvent) => void): AxiosPromise<BaseResponse<I.file.UploadResponseResult>> => {
    return axios({
        method: "post",
        url: "/api/file/upload?random=" + genNonDuplicateID(6),
        headers: {
            "Content-Type": "multipart/form-data"
        },
        data: formData,
        onUploadProgress: onUploadProgress
    })
}

const fileList = (params: I.file.IFileList): Promise<BaseResponse<ListPageType<I.file.baseRow>>> => {
    return axios.get("/api/file/list", { params })
}

const remove = (fileId: string): Promise<void> => {
    return axios.delete("/api/file/" + fileId)
}

export default { upload, fileList, remove }
