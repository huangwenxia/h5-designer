import * as I from "@/api/interface/index"
import axios from "@/api/interceptors"

const upload = (params: FormData): Promise<I.file.IUploadResponse> => {
    return axios.post("/api/file/upload", params)
}

const fileList = (params: I.file.IFileList): Promise<I.file.IFileListResponse> => {
    return axios.post("/api/file/list", params)
}

const remove = (fileId: string): Promise<void> => {
    return axios.delete("/api/file/" + fileId)
}

export default { upload, fileList, remove }
