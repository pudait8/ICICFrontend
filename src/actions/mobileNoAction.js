export const SAVE_MOBILE_NO = 'SAVE_MOBILE_NO'
export const SAVE_MOBILE_NO_RESET = 'SAVE_MOBILE_NO_RESET'


export const mobileNo = (params) => {
    return { type: SAVE_MOBILE_NO, params }
}

export const mobileNoReset = (response) => {
    return { type: SAVE_MOBILE_NO_RESET, response }
}
