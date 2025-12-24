export const GET_PROPERTY_DUE_PAYMENTS = 'GET_PROPERTY_DUE_PAYMENTS'
export const GET_PROPERTY_DUE_PAYMENTS_SUCCESS = 'GET_PROPERTY_DUE_PAYMENTS_SUCCESS'
export const GET_PROPERTY_DUE_PAYMENTS_ALERT = 'GET_PROPERTY_DUE_PAYMENTS_ALERT'
export const GET_PROPERTY_DUE_PAYMENTS_FAIL = 'GET_PROPERTY_DUE_PAYMENTS_FAIL'
export const GET_PROPERTY_DUE_PAYMENTS_RESET_STATE = 'GET_PROPERTY_DUE_PAYMENTS_RESET_STATE'

export const getPropertyDuePayments = (params) => {
    return { type: GET_PROPERTY_DUE_PAYMENTS, params }
}

export const getPropertyDuePaymentsSuccess = (response) => {
    return { type: GET_PROPERTY_DUE_PAYMENTS_SUCCESS, response }
}

export const getPropertyDuePaymentsAlert = (response) => {
    return { type: GET_PROPERTY_DUE_PAYMENTS_ALERT, response }
}

export const getPropertyDuePaymentsFail = (response) => {
    return { type: GET_PROPERTY_DUE_PAYMENTS_FAIL, response }
}
export const getPropertyDuePaymentsResetState = (response) => {
    return { type: GET_PROPERTY_DUE_PAYMENTS_RESET_STATE, response }
}

// Payment integration get payload
export const GET_PAYMENT_INTEGRATION_PAYLOAD = 'GET_PAYMENT_INTEGRATION_PAYLOAD'
export const GET_PAYMENT_INTEGRATION_PAYLOAD_SUCCESS = 'GET_PAYMENT_INTEGRATION_PAYLOAD_SUCCESS'
export const GET_PAYMENT_INTEGRATION_PAYLOAD_ALERT = 'GET_PAYMENT_INTEGRATION_PAYLOAD_ALERT'
export const GET_PAYMENT_INTEGRATION_PAYLOAD_FAIL = 'GET_PAYMENT_INTEGRATION_PAYLOAD_FAIL'

export const getPaymentIntegrationPayload = (params) => {
    return { type: GET_PAYMENT_INTEGRATION_PAYLOAD, params }
}

export const getPaymentIntegrationPayloadSuccess = (response) => {
    return { type: GET_PAYMENT_INTEGRATION_PAYLOAD_SUCCESS, response }
}

export const getPaymentIntegrationPayloadAlert = (response) => {
    return { type: GET_PAYMENT_INTEGRATION_PAYLOAD_ALERT, response }
}

export const getPaymentIntegrationPayloadFail = (response) => {
    return { type: GET_PAYMENT_INTEGRATION_PAYLOAD_FAIL, response }
}

// Payment integration status check
export const PAYMENT_INTEGRATION_STATUS_CHECK = 'PAYMENT_INTEGRATION_STATUS_CHECK'
export const PAYMENT_INTEGRATION_STATUS_CHECK_SUCCESS = 'PAYMENT_INTEGRATION_STATUS_CHECK_SUCCESS'
export const PAYMENT_INTEGRATION_STATUS_CHECK_ALERT = 'PAYMENT_INTEGRATION_STATUS_CHECK_ALERT'
export const PAYMENT_INTEGRATION_STATUS_CHECK_FAIL = 'PAYMENT_INTEGRATION_STATUS_CHECK_FAIL'

export const paymentIntegrationStatusCheck = (params) => {
    return { type: PAYMENT_INTEGRATION_STATUS_CHECK, params }
}

export const paymentIntegrationStatusCheckSuccess = (response) => {
    return { type: PAYMENT_INTEGRATION_STATUS_CHECK_SUCCESS, response }
}

export const paymentIntegrationStatusCheckAlert = (response) => {
    return { type: PAYMENT_INTEGRATION_STATUS_CHECK_ALERT, response }
}

export const paymentIntegrationStatusCheckFail = (response) => {
    return { type: PAYMENT_INTEGRATION_STATUS_CHECK_FAIL, response }
}