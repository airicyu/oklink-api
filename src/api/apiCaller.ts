import { httpClient } from '../request/defaultHttpClient.js'
import { HttpClient } from '../request/httpClientType.js'
import { ApiResult } from './apiResult.js'

const DEFAULT_HEADERS = {
    'Content-Type': 'application/json',
}

export class ApiCaller {
    #config: Config
    #httpClient: HttpClient = httpClient

    constructor({ config, httpClient }: { config: Config; httpClient?: HttpClient }) {
        this.#config = config
        if (httpClient) {
            this.#httpClient = httpClient
        }
    }

    async call({
        method = 'GET',
        path,
        params,
        data,
        timeout = 5000,
    }: {
        path: string
        method?: string
        params?: Record<string, unknown>
        data?: Record<string, unknown>
        timeout?: number
    }): Promise<ApiResult> {
        const requestUrl = `${this.#config.baseUrl}${this.#config.contextPath ?? ''}${path}`

        let dataSerialize = data === null || data === undefined ? '' : JSON.stringify(data)
        if (dataSerialize === '{}') {
            dataSerialize = ''
        }

        const authHeaders = {
            'OK-ACCESS-KEY': this.#config.apiKey ?? '',
        }

        try {
            const response = await this.#httpClient({
                url: requestUrl,
                method,
                timeout,
                headers: { ...DEFAULT_HEADERS, ...authHeaders },
                params,
                data,
            })

            if (typeof response?.data?.code === 'string' && typeof response?.data?.msg === 'string') {
                return new ApiResult(response.data.code, response.data.msg, response.data.data)
            } else {
                throw new Error('Unknown API response format')
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            if (typeof error.response?.data?.code === 'string' && typeof error.response?.data?.msg === 'string') {
                return new ApiResult(error.response.data.code, error.response.data.msg, error.response?.data)
            } else {
                throw error
            }
        }
    }
}

declare type Config = {
    baseUrl: string
    contextPath?: string
    apiKey: string
}
