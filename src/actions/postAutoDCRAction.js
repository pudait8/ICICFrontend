export const POST_AUTO_DCR = 'POST_AUTO_DCR'
export const POST_AUTO_DCR_SUCCESS = 'POST_AUTO_DCR_SUCCESS'
export const POST_AUTO_DCR_ALERT = 'POST_AUTO_DCR_ALERT'
export const POST_AUTO_DCR_FAIL = 'POST_AUTO_DCR_FAIL'
export const POST_AUTO_DCR_RESET_STATE = 'POST_AUTO_DCR_RESET_STATE'


export const postAutoDCR = (params) => {
    return { type: POST_AUTO_DCR, params }
}

export const postAutoDCRSuccess = (response) => {
    return { type: POST_AUTO_DCR_SUCCESS, response }
}

export const postAutoDCRAlert = (response) => {
    return { type: POST_AUTO_DCR_ALERT, response }
}

export const postAutoDCRFail = (response) => {
    return { type: POST_AUTO_DCR_FAIL, response }
}

export const postAutoDCRResetState = () => {
    return { type: POST_AUTO_DCR_RESET_STATE }
}
