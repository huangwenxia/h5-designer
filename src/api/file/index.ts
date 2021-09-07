import * as I from "@/api/interface/index"
import axios from "@/api/interceptors"
import { genNonDuplicateID } from "@/utils"
import { AxiosPromise } from "axios"

// const upload = (params: FormData): Promise<I.file.IUploadResponse> => {
//     return axios.post("/api/file/upload", params)
// }

const upload = (formData: FormData, onUploadProgress?: (e: ProgressEvent) => void): AxiosPromise<AxiosPromise> => {
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

const fileList = (params: I.file.IFileList): Promise<I.file.IFileListResponse> => {
    return axios.post("/api/file/list", params)
}

const remove = (fileId: string): Promise<void> => {
    return axios.delete("/api/file/" + fileId)
}

export default { upload, fileList, remove }
