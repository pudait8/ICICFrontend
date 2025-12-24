export const SAVE_PURCHASER_TRANSFER_APPLICATION = 'SAVE_PURCHASER_TRANSFER_APPLICATION'
export const SAVE_PURCHASER_TRANSFER_APPLICATION_SUCCESS = 'SAVE_PURCHASER_TRANSFER_APPLICATION_SUCCESS'
export const SAVE_PURCHASER_TRANSFER_APPLICATION_ALERT = 'SAVE_PURCHASER_TRANSFER_APPLICATION_ALERT'
export const SAVE_PURCHASER_TRANSFER_APPLICATION_FAIL = 'SAVE_PURCHASER_TRANSFER_APPLICATION_FAIL'
export const SAVE_PURCHASER_TRANSFER_APPLICATION_RESET = 'SAVE_PURCHASER_TRANSFER_APPLICATION_RESET'

export const savePurchaserTransferApplication = (params) => {
    return { type: SAVE_PURCHASER_TRANSFER_APPLICATION, params }
}

export const savePurchaserTransferApplicationSuccess = (response) => {
    return { type: SAVE_PURCHASER_TRANSFER_APPLICATION_SUCCESS, response }
}

export const savePurchaserTransferApplicationAlert = (response) => {
    return { type: SAVE_PURCHASER_TRANSFER_APPLICATION_ALERT, response }
}

export const savePurchaserTransferApplicationFail = (response) => {
    return { type: SAVE_PURCHASER_TRANSFER_APPLICATION_FAIL, response }
}
export const savePurchaserTransferApplicationReset = (response) => {
    return { type: SAVE_PURCHASER_TRANSFER_APPLICATION_RESET, response }
}