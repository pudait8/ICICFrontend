export const GET_DRAWING_SCRUTINY_REPORT = 'GET_DRAWING_SCRUTINY_REPORT'
export const GET_DRAWING_SCRUTINY_REPORT_SUCCESS = 'GET_DRAWING_SCRUTINY_REPORT_SUCCESS'
export const GET_DRAWING_SCRUTINY_REPORT_ALERT = 'GET_DRAWING_SCRUTINY_REPORT_ALERT'
export const GET_DRAWING_SCRUTINY_REPORT_FAIL = 'GET_DRAWING_SCRUTINY_REPORT_FAIL'
export const GET_DRAWING_SCRUTINY_REPORT_RESET_STATE = 'GET_DRAWING_SCRUTINY_REPORT_RESET_STATE'

export const getDrawingScrutinyReport = (params) => {
    return { type: GET_DRAWING_SCRUTINY_REPORT, params }
}

export const getDrawingScrutinyReportSuccess = (response) => {
    return { type: GET_DRAWING_SCRUTINY_REPORT_SUCCESS, response }
}

export const getDrawingScrutinyReportAlert = (response) => {
    return { type: GET_DRAWING_SCRUTINY_REPORT_ALERT, response }
}

export const getDrawingScrutinyReportFail = (response) => {
    return { type: GET_DRAWING_SCRUTINY_REPORT_FAIL, response }
}
export const getDrawingScrutinyReportResetState = (response) => {
    return { type: GET_DRAWING_SCRUTINY_REPORT_RESET_STATE, response }
}