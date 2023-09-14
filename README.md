# oklink-api

This is a non-official JS SDK API for calling [OKLink's API product](https://www.oklink.com/hk).

Features:
- Helper to call APIs generally
- SDK method to call on-chain AML APIs

----

# install

```
npm i oklink-api
```

----

# Examples

## Hello world

### Using API Caller

```javascript
import { ApiCaller } from 'oklink-api'

const api = new ApiCaller({
    config: {
        baseUrl: 'https://www.oklink.com',
        apiKey: 'XXXXXX',
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
        // params: the query param map
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
        path: '/api/v5/tracker/kya/creat-address-monitoring',
        // data: Post body
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
```

API result output sample:

```
Example 1: GET method with query params

ApiResult { 
  code: '0',
  msg: '',
  data: [
    {
      chainFullName: 'TRON',
      token: 'TRX',
      tokenContractAddress: '',
      txid: '9eef7ca0168332654b4392b61f55c6208f39f5edd52cdbb9adf150529399e34d',
      outputAddress: 'TWd4WrZ9wn84f5x1hZhL4DHvk738ns5jwb',
      inputAddresses: 'TZAzpGxSLHoKDEo1PhS18hTvnLSU57w44G',
      usdAmount: '0.0000000811',
      tokenAmount: '0.000001',
      transactionTime: '1683780423000',
      network: 'TRON'
    }
  ],
  error: null
}

Example 2: POST method with post body

ApiResult {
  code: '0',
  msg: '',
  data: [
    {
      address: '0x8894E0a0c962CB723c1976a4421c95949bE2D4E3',
      network: 'BSC'
    }
  ],
  error: null
}
```

----

## Usnig OnChainAMLSDK

It is similar to API caller, but the APIs are wrapped as methods.

Below is an example that do similar things as previous hello-world with `OnChainAMLSDK`.

```javascript
import { ApiCaller, OnChainAMLSDK } from 'oklink-api'

const api = new ApiCaller({
    config: {
        baseUrl: 'https://www.oklink.com',
        apiKey: 'XXXXXX',
    },
})

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
    await onChainAMLSDK.kya.createddressMonitoring({
        duration: '30D',
        trigger: 'BLACK_TYPE',
        note: 'binance',
        phone: '18888',
        network: 'BSC',
        address: '0x8894E0a0c962CB723c1976a4421c95949bE2D4E3',
    }),
)
```

----

# APIs

## ApiCaller

Can see below type description:

```javascript
class ApiCaller {
    
    constructor({ config, httpClient }: {
        config: Config;
        httpClient?: HttpClient;
    });
    
    call({ method, path, params, data, timeout, }: {
        path: string;
        method?: string;
        params?: Record<string, unknown>;
        data?: Record<string, unknown>;
        timeout?: number;
    }): Promise<ApiResult>;
}

type Config = {
    baseUrl: string;
    contextPath?: string;
    apiKey: string;
};
```

The core part is the `call` method, which can call any APIs freely controlled by yourself.

parameters:
- path: API path
- method: GET/POST, default GET
- params: query params
- data: post data body

----

## ApiResult (API result wrapper)

It is thin wrapper of the V5 API's raw response result. It has the following attributes:

- code (string)
- msg (string)
- data (any)

In addition:
- success (boolean)
- error (of type `ApiError` or null)

It also has a method of `getOrThrow`, which return the `data` if success, or throw error otherwise.

-----

## ApiError (Error wrapper)

just an Error wrapping V5-API's code and message.

```javascript
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
```

----

## OnChainAMLSDK

It contains the APIs which is under the On-Chain AML API product.

TLDR:

Call KYT APIs:
```
await OnChainAMLSDK.kyt.XXX(parameters);
```

Call KYA APIs:
```
await OnChainAMLSDK.kya.XXX(parameters);
```

Call tokenRiskScanner APIs:
```
await OnChainAMLSDK.tokenRiskScanner.XXX(parameters);
```

There are too many methods but basically it is just a mapping of APIs from OKLink API's developer doc.

We would not list out all but just let the type declaration be the doc itself.

type declaration file:

```javascript
export declare class OnChainAMLSDK {

    kyt: {
        chainList: ({ category }: {
            category?: string | undefined;
        }) => Promise<import("../main.js").ApiResult>;

        transfersInfo: ({ network, tokenContractAddress, txid, outputAddress, }: {
            network: string;
            tokenContractAddress?: string | undefined;
            txid: string;
            outputAddress: string;
        }) => Promise<import("../main.js").ApiResult>;

        transfersExposures: ({ network, tokenContractAddress, txid, address, direction, }: {
            network: string;
            tokenContractAddress?: string | undefined;
            txid?: string | undefined;
            address?: string | undefined;
            direction?: string | undefined;
        }) => Promise<import("../main.js").ApiResult>;

        transfersAlerts: ({ userId, network, tokenContractAddress, txid, outputAddress, index, direction, tag, tokenAmount, tokenPrice, }: {
            userId: string;
            network: string;
            tokenContractAddress?: string | undefined;
            txid: string;
            outputAddress: string;
            index?: string | undefined;
            direction: string;
            tag?: string | undefined;
            tokenAmount?: string | undefined;
            tokenPrice?: string | undefined;
        }) => Promise<import("../main.js").ApiResult>;

        transfersWithdrawalAttemptsAlerts: ({ userId, network, tokenContractAddress, address, direction, tag, tokenAmount, tokenPrice, time, }: {
            userId: string;
            network: string;
            tokenContractAddress?: string | undefined;
            address: string;
            direction: string;
            tag?: string | undefined;
            tokenAmount: string;
            tokenPrice: string;
            time?: string | undefined;
        }) => Promise<import("../main.js").ApiResult>;

        alerts: ({ userId, token, tokenContractAddress, produceAlertType, alertLevel, alertType, alertStatus, limit, page, begin, end, }: {
            userId?: string | undefined;
            token?: string | undefined;
            tokenContractAddress?: string | undefined;
            produceAlertType?: string | undefined;
            alertLevel?: string | undefined;
            alertType?: string | undefined;
            alertStatus?: string | undefined;
            limit?: string | undefined;
            page?: string | undefined;
            begin?: string | undefined;
            end?: string | undefined;
        }) => Promise<import("../main.js").ApiResult>;

        updateAlertStatus: ({ alertId, alertStatus, comment }: {
            alertId: string;
            alertStatus: string;
            comment?: string | undefined;
        }) => Promise<import("../main.js").ApiResult>;

        alertStatus: ({ alertId }: {
            alertId: string;
        }) => Promise<import("../main.js").ApiResult>;

        users: ({ limit, page }: {
            limit?: string | undefined;
            page?: string | undefined;
        }) => Promise<import("../main.js").ApiResult>;

        user: ({ userId, limit, page }: {
            userId: string;
            limit?: string | undefined;
            page?: string | undefined;
        }) => Promise<import("../main.js").ApiResult>;
    };

    kya: {
        chainList: () => Promise<import("../main.js").ApiResult>;

        addressRiskLevel: ({ network, address }: {
            network: string;
            address: string;
        }) => Promise<import("../main.js").ApiResult>;

        addressRiskScreening: ({ network, address }: {
            network: string;
            address: string;
        }) => Promise<import("../main.js").ApiResult>;

        createddressMonitoring: ({ network, address, note, trigger, duration, phone, email, }: {
            network: string;
            address: string;
            note?: string | undefined;
            trigger?: string | undefined;
            duration?: string | undefined;
            phone?: string | undefined;
            email?: string | undefined;
        }) => Promise<import("../main.js").ApiResult>;

        cancelAddressMonitoring: ({ network, address }: {
            network: string;
            address: string;
        }) => Promise<import("../main.js").ApiResult>;

        addressMonitoringList: ({ network, address, trigger, limit, page, }: {
            network: string;
            address: string;
            trigger?: string | undefined;
            limit?: string | undefined;
            page?: string | undefined;
        }) => Promise<import("../main.js").ApiResult>;

        addressMonitoringDetail: ({ network, address }: {
            network: string;
            address: string;
        }) => Promise<import("../main.js").ApiResult>;

        entityTag: ({ chainShortName, address }: {
            chainShortName: string;
            address: string;
        }) => Promise<import("../main.js").ApiResult>;

        entityBlackTag: ({ chainShortName, address }: {
            chainShortName: string;
            address: string;
        }) => Promise<import("../main.js").ApiResult>;

        tagAll: ({ chainShortName, address }: {
            chainShortName: string;
            address: string;
        }) => Promise<import("../main.js").ApiResult>;
    };

    tokenRiskScanner: {
        chainList: () => Promise<import("../main.js").ApiResult>;

        tokenRiskScanning: ({ chainShortName, tokenContractAddress }: {
            chainShortName: string;
            tokenContractAddress: string;
        }) => Promise<import("../main.js").ApiResult>;

        privilegedAddress: ({ chainShortName, tokenContractAddress }: {
            chainShortName: string;
            tokenContractAddress: string;
        }) => Promise<import("../main.js").ApiResult>;

        privilegedFunction: ({ chainShortName, tokenContractAddress }: {
            chainShortName: string;
            tokenContractAddress: string;
        }) => Promise<import("../main.js").ApiResult>;

        privilegedTransaction: ({ chainShortName, tokenContractAddress, limit, page, }: {
            chainShortName: string;
            tokenContractAddress: string;
            limit?: string | undefined;
            page?: string | undefined;
        }) => Promise<import("../main.js").ApiResult>;

        contractRiskScanning: ({ chainShortName, inputData }: {
            chainShortName: string;
            inputData: string;
        }) => Promise<import("../main.js").ApiResult>;

    };

    constructor({ apiCaller }: {
        apiCaller: ApiCaller;
    });
}

```