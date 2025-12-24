export const GET_APPOINTMENT_HISTORY = 'GET_APPOINTMENT_HISTORY'
export const GET_APPOINTMENT_HISTORY_SUCCESS = 'GET_APPOINTMENT_HISTORY_SUCCESS'
export const GET_APPOINTMENT_HISTORY_ALERT = 'GET_APPOINTMENT_HISTORY_ALERT'
export const GET_APPOINTMENT_HISTORY_FAIL = 'GET_APPOINTMENT_HISTORY_FAIL'
export const GET_APPOINTMENT_HISTORY_RESET_STATE = 'GET_APPOINTMENT_HISTORY_RESET_STATE'


export const getAppointmentHistory = (params) => {
    return { type: GET_APPOINTMENT_HISTORY, params }
}

export const getAppointmentHistorySuccess = (response) => {
    return { type: GET_APPOINTMENT_HISTORY_SUCCESS, response }
}

export const getAppointmentHistoryAlert = (response) => {
    return { type: GET_APPOINTMENT_HISTORY_ALERT, response }
}

export const getAppointmentHistoryFail = (response) => {
    return { type: GET_APPOINTMENT_HISTORY_FAIL, response }
}

export const getAppointmentHistoryResetState = () => {
    return { type: GET_APPOINTMENT_HISTORY_RESET_STATE }
}
