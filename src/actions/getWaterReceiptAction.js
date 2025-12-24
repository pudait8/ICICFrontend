export const GET_WATER_RECEIPT = 'GET_WATER_RECEIPT'
export const GET_WATER_RECEIPT_SUCCESS = 'GET_WATER_RECEIPT_SUCCESS'
export const GET_WATER_RECEIPT_ALERT = 'GET_WATER_RECEIPT_ALERT'
export const GET_WATER_RECEIPT_FAIL = 'GET_WATER_RECEIPT_FAIL'
export const GET_WATER_RECEIPT_RESET = 'GET_WATER_RECEIPT_RESET'


export const getWaterReceipt = (params) => {
    return { type: GET_WATER_RECEIPT, params }
}

export const getWaterReceiptSuccess = (response) => {
    return { type: GET_WATER_RECEIPT_SUCCESS, response }
}

export const getWaterReceiptAlert = (response) => {
    return { type: GET_WATER_RECEIPT_ALERT, response }
}

export const getWaterReceiptFail = (response) => {
    return { type: GET_WATER_RECEIPT_FAIL, response }
}

export const getWaterReceiptReset = () => {
    return { type: GET_WATER_RECEIPT_RESET }
}
