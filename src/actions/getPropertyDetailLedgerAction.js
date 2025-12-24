export const GET_PROPERTY_DETAIL_LEDGER = 'GET_PROPERTY_DETAIL_LEDGER'
export const GET_PROPERTY_DETAIL_LEDGER_SUCCESS = 'GET_PROPERTY_DETAIL_LEDGER_SUCCESS'
export const GET_PROPERTY_DETAIL_LEDGER_ALERT = 'GET_PROPERTY_DETAIL_LEDGER_ALERT'
export const GET_PROPERTY_DETAIL_LEDGER_FAIL = 'GET_PROPERTY_DETAIL_LEDGER_FAIL'
export const GET_PROPERTY_DETAIL_LEDGER_RESET_STATE = 'GET_PROPERTY_DETAIL_LEDGER_RESET_STATE'

export const getPropertyDetailLedger = (params) => {
    return { type: GET_PROPERTY_DETAIL_LEDGER, params }
}

export const getPropertyDetailLedgerSuccess = (response) => {
    return { type: GET_PROPERTY_DETAIL_LEDGER_SUCCESS, response }
}

export const getPropertyDetailLedgerAlert = (response) => {
    return { type: GET_PROPERTY_DETAIL_LEDGER_ALERT, response }
}

export const getPropertyDetailLedgerFail = (response) => {
    return { type: GET_PROPERTY_DETAIL_LEDGER_FAIL, response }
}

export const getPropertyDetailLedgerResetState = () => {
    return { type: GET_PROPERTY_DETAIL_LEDGER_RESET_STATE }
}
