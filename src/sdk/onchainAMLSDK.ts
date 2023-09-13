import { ApiCaller } from '../api/apiCaller.js'

export class OnChainAMLSDK {
    #apiCaller: ApiCaller

    kyt = {
        chainList: async ({ category }: { category?: string }) => {
            return this.#apiCaller.call({ path: '/api/v5/tracker/kyt/chain-list', params: { category } })
        },
        transfersInfo: async ({
            network,
            tokenContractAddress,
            txid,
            outputAddress,
        }: {
            network: string
            tokenContractAddress?: string
            txid: string
            outputAddress: string
        }) => {
            return this.#apiCaller.call({
                path: '/api/v5/tracker/kyt/transfers-info',
                params: { network, tokenContractAddress, txid, outputAddress },
            })
        },
        transfersExposures: async ({
            network,
            tokenContractAddress,
            txid,
            address,
            direction,
        }: {
            network: string
            tokenContractAddress?: string
            txid?: string
            address?: string
            direction?: string
        }) => {
            return this.#apiCaller.call({
                path: '/api/v5/tracker/kyt/transfers/exposures',
                params: { network, tokenContractAddress, txid, address, direction },
            })
        },
        transfersAlerts: async ({
            userId,
            network,
            tokenContractAddress,
            txid,
            outputAddress,
            index,
            direction,
            tag,
            tokenAmount,
            tokenPrice,
        }: {
            userId: string
            network: string
            tokenContractAddress?: string
            txid: string
            outputAddress: string
            index?: string
            direction: string
            tag?: string
            tokenAmount?: string
            tokenPrice?: string
        }) => {
            return this.#apiCaller.call({
                path: '/api/v5/tracker/kyt/transfers/transfers-alerts',
                params: { userId, network, tokenContractAddress, txid, outputAddress, index, direction, tag, tokenAmount, tokenPrice },
            })
        },
        transfersWithdrawalAttemptsAlerts: async ({
            userId,
            network,
            tokenContractAddress,
            address,
            direction,
            tag,
            tokenAmount,
            tokenPrice,
            time,
        }: {
            userId: string
            network: string
            tokenContractAddress?: string
            address: string
            direction: string
            tag?: string
            tokenAmount: string
            tokenPrice: string
            time?: string
        }) => {
            return this.#apiCaller.call({
                path: '/api/v5/tracker/kyt/transfers/withdrawal-attempts-alerts',
                params: { userId, network, tokenContractAddress, address, direction, tag, tokenAmount, tokenPrice, time },
            })
        },
        alerts: async ({
            userId,
            token,
            tokenContractAddress,
            produceAlertType,
            alertLevel,
            alertType,
            alertStatus,
            limit,
            page,
            begin,
            end,
        }: {
            userId?: string
            token?: string
            tokenContractAddress?: string
            produceAlertType?: string
            alertLevel?: string
            alertType?: string
            alertStatus?: string
            limit?: string
            page?: string
            begin?: string
            end?: string
        }) => {
            return this.#apiCaller.call({
                path: '/api/v5/tracker/kyt/alerts',
                params: { userId, token, tokenContractAddress, produceAlertType, alertLevel, alertType, alertStatus, limit, page, begin, end },
            })
        },
        updateAlertStatus: async ({ alertId, alertStatus, comment }: { alertId: string; alertStatus: string; comment?: string }) => {
            return this.#apiCaller.call({
                method: 'POST',
                path: '/api/v5/tracker/kyt/update-alert-status',
                data: { alertId, alertStatus, comment },
            })
        },
        alertStatus: async ({ alertId }: { alertId: string }) => {
            return this.#apiCaller.call({
                path: '/api/v5/tracker/kyt/alert-status',
                params: { alertId },
            })
        },
        users: async ({ limit, page }: { limit?: string; page?: string }) => {
            return this.#apiCaller.call({
                path: '/api/v5/tracker/kyt/users',
                params: { limit, page },
            })
        },
        user: async ({ userId, limit, page }: { userId: string; limit?: string; page?: string }) => {
            return this.#apiCaller.call({
                path: '/api/v5/tracker/kyt/user',
                params: { limit, page },
            })
        },
    }

    kya = {
        chainList: async ({
            chainFullName,
            chainShortName,
            chainId,
            network,
        }: {
            chainFullName?: string
            chainShortName?: string
            chainId?: string
            network?: string
        }) => {
            return this.#apiCaller.call({ path: '/api/v5/tracker/kya/chain-list', params: { chainFullName, chainShortName, chainId, network } })
        },
        addressRiskLevel: async ({ network, address }: { network: string; address: string }) => {
            return this.#apiCaller.call({ path: '/api/v5/tracker/kya/address-risk-level', params: { network, address } })
        },
        addressRiskScreening: async ({ network, address }: { network: string; address: string }) => {
            return this.#apiCaller.call({ path: '/api/v5/tracker/kya/address-risk-screening', params: { network, address } })
        },
        createddressMonitoring: async ({
            network,
            address,
            note,
            trigger,
            duration,
            phone,
            email,
        }: {
            network: string
            address: string
            note?: string
            trigger?: string
            duration?: string
            phone?: string
            email?: string
        }) => {
            return this.#apiCaller.call({
                method: 'POST',
                path: '/api/v5/tracker/kya/creat-address-monitoring',
                data: { network, address, note, trigger, duration, phone, email },
            })
        },
        cancelAddressMonitoring: async ({ network, address }: { network: string; address: string }) => {
            return this.#apiCaller.call({
                method: 'POST',
                path: '/api/v5/tracker/kya/cancel-address-monitoring',
                data: { network, address },
            })
        },
        addressMonitoringList: async ({
            network,
            address,
            trigger,
            limit,
            page,
        }: {
            network: string
            address: string
            trigger?: string
            limit?: string
            page?: string
        }) => {
            return this.#apiCaller.call({
                path: '/api/v5/tracker/kya/address-monitoring-list',
                params: { network, address, trigger, limit, page },
            })
        },
        addressMonitoringDetail: async ({ network, address }: { network: string; address: string }) => {
            return this.#apiCaller.call({
                path: '/api/v5/tracker/kya/address-monitoring-detail',
                params: { network, address },
            })
        },
        entityTag: async ({ chainShortName, address }: { chainShortName: string; address: string }) => {
            return this.#apiCaller.call({
                path: '/api/v5/tracker/tag/entity-tag',
                params: { chainShortName, address },
            })
        },
        entityBlackTag: async ({ chainShortName, address }: { chainShortName: string; address: string }) => {
            return this.#apiCaller.call({
                path: '/api/v5/tracker/tag/entity-black-tag',
                params: { chainShortName, address },
            })
        },
        tagAll: async ({ chainShortName, address }: { chainShortName: string; address: string }) => {
            return this.#apiCaller.call({
                path: '/api/v5/tracker/tag/tag-all',
                params: { chainShortName, address },
            })
        },
    }

    tokenRiskScanner = {
        chainList: async () => {
            return this.#apiCaller.call({ path: '/api/v5/tracker/tokenscanner/chain-list' })
        },
        tokenRiskScanning: async ({ chainShortName, tokenContractAddress }: { chainShortName: string; tokenContractAddress: string }) => {
            return this.#apiCaller.call({
                path: '/api/v5/tracker/tokenscanner/token-risk-scanning',
                params: { chainShortName, tokenContractAddress },
            })
        },
        privilegedAddress: async ({ chainShortName, tokenContractAddress }: { chainShortName: string; tokenContractAddress: string }) => {
            return this.#apiCaller.call({
                path: '/api/v5/tracker/tokenscanner/privileged-address',
                params: { chainShortName, tokenContractAddress },
            })
        },
        privilegedFunction: async ({ chainShortName, tokenContractAddress }: { chainShortName: string; tokenContractAddress: string }) => {
            return this.#apiCaller.call({
                path: '/api/v5/tracker/tokenscanner/privileged-function',
                params: { chainShortName, tokenContractAddress },
            })
        },
        privilegedTransaction: async ({
            chainShortName,
            tokenContractAddress,
            limit,
            page,
        }: {
            chainShortName: string
            tokenContractAddress: string
            limit?: string
            page?: string
        }) => {
            return this.#apiCaller.call({
                path: '/api/v5/tracker/tokenscanner/privileged-transaction',
                params: { chainShortName, tokenContractAddress, limit, page },
            })
        },
        contractRiskScanning: async ({ chainShortName, inputData }: { chainShortName: string; inputData: string }) => {
            return this.#apiCaller.call({
                path: '/api/v5/tracker/contractscanner/contract-risk-scanning',
                params: { chainShortName, inputData },
            })
        },
    }

    constructor({ apiCaller }: { apiCaller: ApiCaller }) {
        this.#apiCaller = apiCaller
    }
}
