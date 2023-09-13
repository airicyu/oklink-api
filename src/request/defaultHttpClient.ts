/* eslint-disable @typescript-eslint/no-explicit-any */

import axios, { AxiosInstance } from 'axios'
import http from 'http'
import https from 'https'
import { HttpClient } from './httpClientType.js'

const httpAgent = new http.Agent({
    keepAlive: true,
    keepAliveMsecs: 5000,
})

const httpsAgent = new https.Agent({
    keepAlive: true,
    keepAliveMsecs: 5000,
})

const axiosInstance = axios.create({
    headers: {
        'content-type': 'application/json;charset=utf-8',
        Accept: 'application/json',
    },
    maxRedirects: 0,
    timeout: 5000,
    httpAgent,
    httpsAgent,
    validateStatus: (status) => {
        return status < 600
    },
}) as AxiosInstance

const httpClient: HttpClient = (options: {
    url: string
    method: string
    headers?: Record<string, string>
    params?: any
    data?: any
    timeout?: number
    [propName: string]: any
}) => {
    return axiosInstance.request(options)
}

export { httpClient }
