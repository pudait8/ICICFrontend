export const GET_PROPERTY_LEDGER = 'GET_PROPERTY_LEDGER'
export const GET_PROPERTY_LEDGER_SUCCESS = 'GET_PROPERTY_LEDGER_SUCCESS'
export const GET_PROPERTY_LEDGER_ALERT = 'GET_PROPERTY_LEDGER_ALERT'
export const GET_PROPERTY_LEDGER_FAIL = 'GET_PROPERTY_LEDGER_FAIL'
export const GET_PROPERTY_LEDGER_RESET_STATE = 'GET_PROPERTY_LEDGER_RESET_STATE'

export const getPropertyLedger = (params) => {
    return { type: GET_PROPERTY_LEDGER, params }
}

export const getPropertyLedgerSuccess = (response) => {
    return { type: GET_PROPERTY_LEDGER_SUCCESS, response }
}

export const getPropertyLedgerAlert = (response) => {
    return { type: GET_PROPERTY_LEDGER_ALERT, response }
}

export const getPropertyLedgerFail = (response) => {
    return { type: GET_PROPERTY_LEDGER_FAIL, response }
}

export const getPropertyLedgerResetState = () => {
    return { type: GET_PROPERTY_LEDGER_RESET_STATE }
}
