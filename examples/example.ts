import { ApiCaller } from '../src/main.js'
import { OnChainAMLSDK } from '../src/main.js'

const api = new ApiCaller({
    config: {
        baseUrl: 'https://www.oklink.com',
        apiKey: 'XXXXXXXX',
    },
})

/**
 * Call API by api caller
 */

/**
 * Example 1: GET method with query params
 */
console.log('Example 1: GET method with query params')
console.log(
    await api.call({
        method: 'GET',
        path: '/api/v5/tracker/kyt/transfers-info',
        params: {
            network: 'TRON',
            txid: '9eef7ca0168332654b4392b61f55c6208f39f5edd52cdbb9adf150529399e34d',
            outputAddress: 'TWd4WrZ9wn84f5x1hZhL4DHvk738ns5jwb',
        },
    }),
)

/**
 * Example 2: POST method with post body
 */
console.log('Example 2: POST method with post body')
console.log(
    await api.call({
        method: 'POST',
        path: '/api/v5/tracker/kya/create-address-monitoring',
        data: {
            duration: '30D',
            trigger: 'BLACK_TYPE',
            note: 'binance',
            phone: '18888',
            network: 'BSC',
            address: '0x8894E0a0c962CB723c1976a4421c95949bE2D4E3',
        },
    }),
)

/**
 * Call API by onChainAMLSDK
 */
const onChainAMLSDK = new OnChainAMLSDK({ apiCaller: api })

/**
 * Example 1: GET method with query params
 */
console.log(
    await onChainAMLSDK.kyt.transfersInfo({
        network: 'TRON',
        txid: '9eef7ca0168332654b4392b61f55c6208f39f5edd52cdbb9adf150529399e34d',
        outputAddress: 'TWd4WrZ9wn84f5x1hZhL4DHvk738ns5jwb',
    }),
)

/**
 * Example 2: POST method with post body
 */
console.log(
    await onChainAMLSDK.kya.createAddressMonitoring({
        duration: '30D',
        trigger: 'BLACK_TYPE',
        note: 'binance',
        phone: '18888',
        network: 'BSC',
        address: '0x8894E0a0c962CB723c1976a4421c95949bE2D4E3',
    }),
)

console.log('done')
