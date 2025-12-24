export const GET_PROPERTY_ALL_PAYMENTS = 'GET_PROPERTY_ALL_PAYMENTS'
export const GET_PROPERTY_ALL_PAYMENTS_SUCCESS = 'GET_PROPERTY_ALL_PAYMENTS_SUCCESS'
export const GET_PROPERTY_ALL_PAYMENTS_ALERT = 'GET_PROPERTY_ALL_PAYMENTS_ALERT'
export const GET_PROPERTY_ALL_PAYMENTS_FAIL = 'GET_PROPERTY_ALL_PAYMENTS_FAIL'

export const getPropertyAllPayments = (params) => {
    return { type: GET_PROPERTY_ALL_PAYMENTS, params }
}

export const getPropertyAllPaymentsSuccess = (response) => {
    return { type: GET_PROPERTY_ALL_PAYMENTS_SUCCESS, response }
}

export const getPropertyAllPaymentsAlert = (response) => {
    return { type: GET_PROPERTY_ALL_PAYMENTS_ALERT, response }
}

export const getPropertyAllPaymentsFail = (response) => {
    return { type: GET_PROPERTY_ALL_PAYMENTS_FAIL, response }
}