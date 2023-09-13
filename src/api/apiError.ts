export class ApiError extends Error {
    code: string
    msg: string

    constructor(code: string, msg: string) {
        super(`${code}: ${msg}`)
        this.code = code
        this.msg = msg
        this.name = 'ApiError'
    }
}
