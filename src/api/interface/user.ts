// import { IResponse } from "@/api/interface/common"

/**用户登录 */
export interface ILogin {
    name: string
    password: string
}
export interface ILoginResponse {
    status: number
    result?: string
    message?: string
}
export interface IRegister {
    email: string
    code: string
    username: string
    password: string
}
export interface IRegisterResponse {
    status: number
}
export interface IGetCode {
    email: string
}
export interface IGetCodeResponse {
    status: number
}

export interface InfoResponseResult {
    id: number
    username: string
    email: string
    name: null
    sex: number
    type: number
    phone: null
    status: number
    lastLoginTime: "2021-08-20 20:18:10"
    lastLoginIp: string
    createdAt: string
    updatedAt: string
    avatar: null
}

export interface IUserInfoResponse {
    status: number
    result: InfoResponseResult
}
