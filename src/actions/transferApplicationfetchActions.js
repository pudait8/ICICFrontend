export const FETCH_TRANSFER_APPLICATION = 'FETCH_TRANSFER_APPLICATION'
export const FETCH_TRANSFER_APPLICATION_SUCCESS = 'FETCH_TRANSFER_APPLICATION_SUCCESS'
export const FETCH_TRANSFER_APPLICATION_ALERT = 'FETCH_TRANSFER_APPLICATION_ALERT'
export const FETCH_TRANSFER_APPLICATION_FAIL = 'FETCH_TRANSFER_APPLICATION_FAIL'
export const RESET_STATE_FETCH_TRANSFER_APPLICATION = 'RESET_STATE_FETCH_TRANSFER_APPLICATION'

export const fetchTransferApplication = (params) => {
    return { type: FETCH_TRANSFER_APPLICATION, params }
}

export const fetchTransferApplicationSuccess = (response) => {
    return { type: FETCH_TRANSFER_APPLICATION_SUCCESS, response }
}

export const fetchTransferApplicationAlert = (response) => {
    return { type: FETCH_TRANSFER_APPLICATION_ALERT, response }
}

export const fetchTransferApplicationFail = (response) => {
    return { type: FETCH_TRANSFER_APPLICATION_FAIL, response }
}

export const resetStateFetchTransferApplication = () => {
    return { type: RESET_STATE_FETCH_TRANSFER_APPLICATION }
}