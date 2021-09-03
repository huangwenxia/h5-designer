// import { IResponse } from "@/api/interface/common"

/**用户登录 */
export interface ILogin {
    name: string
    password: string
}
export interface ILoginResponse {
    status: number
    result?: string | undefined
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
    id: string | number
    username: string
    email: string
    name: string
    sex: string | number
    type: string | number
    phone: string | number
    status: string | number
    lastLoginTime: string | number
    lastLoginIp: string | number
    createdAt: string | number
    updatedAt: string | number
    avatar: string
    birth?: string
    address: string
}

export interface IUserInfoResponse {
    status: number
    result: InfoResponseResult
}
export interface IUserUpdate {
    name: string
    avatar: string
    phone: string | number
    sex: string | number //1、男，2、女
    address: string
    birth: string | number
}
export interface IUserUpdateResponse {
    status: number | string | undefined
}
