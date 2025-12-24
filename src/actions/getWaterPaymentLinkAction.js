export const GET_WATER_PAYMENT_LINK = 'GET_WATER_PAYMENT_LINK'
export const GET_WATER_PAYMENT_LINK_SUCCESS = 'GET_WATER_PAYMENT_LINK_SUCCESS'
export const GET_WATER_PAYMENT_LINK_ALERT = 'GET_WATER_PAYMENT_LINK_ALERT'
export const GET_WATER_PAYMENT_LINK_FAIL = 'GET_WATER_PAYMENT_LINK_FAIL'
export const GET_WATER_PAYMENT_LINK_RESET = 'GET_WATER_PAYMENT_LINK_RESET'


export const getWaterPaymentLink = (params) => {
    return { type: GET_WATER_PAYMENT_LINK, params }
}

export const getWaterPaymentLinkSuccess = (response) => {
    return { type: GET_WATER_PAYMENT_LINK_SUCCESS, response }
}

export const getWaterPaymentLinkAlert = (response) => {
    return { type: GET_WATER_PAYMENT_LINK_ALERT, response }
}

export const getWaterPaymentLinkFail = (response) => {
    return { type: GET_WATER_PAYMENT_LINK_FAIL, response }
}

export const getWaterPaymentLinkReset = () => {
    return { type: GET_WATER_PAYMENT_LINK_RESET }
}
