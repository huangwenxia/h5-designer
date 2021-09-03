import { useGlobalHook } from "@/utils/useGlobalHook"
import { reactive, toRefs } from "vue"
import * as I from "@/api/interface/index"
export interface FormType {
    loading: boolean
}
interface CustomRequestOption {
    onProgress: (event: { percent: number }) => void
    onError: (event: Error, body?: I.file.IUploadResponse) => void
    onSuccess: (body: I.file.IUploadResponse) => void
    // data: Object
    filename: string
    file: File
    withCredentials: boolean
    action: string
    // headers: Object
}
export const useFileUploadEffect = () => {
    const { api, message } = useGlobalHook()
    const form = reactive<FormType>({
        loading: false
    })
    const onUpload = (options: CustomRequestOption) => {
        const formData = new FormData()
        formData.append("files", options.file)
        api.fileApi
            .upload(formData)
            .then(() => {
                form.loading = false
                message.info({
                    type: "success",
                    content: "上传成功",
                    duration: 2000
                })
            })
            .catch(() => {
                form.loading = false
            })
    }
    return { ...toRefs(form), onUpload }
}
