export const GET_OLD_BILL_DETAILS = 'GET_OLD_BILL_DETAILS'
export const GET_OLD_BILL_DETAILS_SUCCESS = 'GET_OLD_BILL_DETAILS_SUCCESS'
export const GET_OLD_BILL_DETAILS_ALERT = 'GET_OLD_BILL_DETAILS_ALERT'
export const GET_OLD_BILL_DETAILS_FAIL = 'GET_OLD_BILL_DETAILS_FAIL'
export const GET_OLD_BILL_DETAILS_RESET_STATE = 'GET_OLD_BILL_DETAILS_RESET_STATE'


export const getOldBillDetails = (params) => {
    return { type: GET_OLD_BILL_DETAILS, params }
}

export const getOldBillDetailsSuccess = (response) => {
    return { type: GET_OLD_BILL_DETAILS_SUCCESS, response }
}

export const getOldBillDetailsAlert = (response) => {
    return { type: GET_OLD_BILL_DETAILS_ALERT, response }
}

export const getOldBillDetailsFail = (response) => {
    return { type: GET_OLD_BILL_DETAILS_FAIL, response }
}

export const getOldBillDetailsResetState = () => {
    return { type: GET_OLD_BILL_DETAILS_RESET_STATE }
}
