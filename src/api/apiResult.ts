/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApiError } from './apiError.js'

export class ApiResult {
    code: string
    msg: string
    data: any = undefined
    error: ApiError | null = null

    constructor(code: string, msg: string, data: any) {
        this.code = code
        this.msg = msg
        this.data = data
        if (this.code !== '0') {
            this.error = new ApiError(code, msg)
        }
    }

    get success() {
        return this.code === '0'
    }

    getOrThrow() {
        if (!this.success) {
            throw this.error
        } else {
            return this.data
        }
    }
}
