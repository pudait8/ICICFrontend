export const GET_WATER_BILL_DETAILS = 'GET_WATER_BILL_DETAILS'
export const GET_WATER_BILL_DETAILS_SUCCESS = 'GET_WATER_BILL_DETAILS_SUCCESS'
export const GET_WATER_BILL_DETAILS_ALERT = 'GET_WATER_BILL_DETAILS_ALERT'
export const GET_WATER_BILL_DETAILS_FAIL = 'GET_WATER_BILL_DETAILS_FAIL'
export const GET_WATER_BILL_DETAILS_RESET = 'GET_WATER_BILL_DETAILS_RESET'


export const getWaterBillDetails = (params) => {
    return { type: GET_WATER_BILL_DETAILS, params }
}

export const getWaterBillDetailsSuccess = (response) => {
    return { type: GET_WATER_BILL_DETAILS_SUCCESS, response }
}

export const getWaterBillDetailsAlert = (response) => {
    return { type: GET_WATER_BILL_DETAILS_ALERT, response }
}

export const getWaterBillDetailsFail = (response) => {
    return { type: GET_WATER_BILL_DETAILS_FAIL, response }
}

export const getWaterBillDetailsReset = () => {
    return { type: GET_WATER_BILL_DETAILS_RESET }
}
