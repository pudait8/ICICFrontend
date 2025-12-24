export const GET_APPOINTMENT_DATE = 'GET_APPOINTMENT_DATE'
export const GET_APPOINTMENT_DATE_SUCCESS = 'GET_APPOINTMENT_DATE_SUCCESS'
export const GET_APPOINTMENT_DATE_ALERT = 'GET_APPOINTMENT_DATE_ALERT'
export const GET_APPOINTMENT_DATE_FAIL = 'GET_APPOINTMENT_DATE_FAIL'
export const GET_APPOINTMENT_DATE_RESET_STATE = 'GET_APPOINTMENT_DATE_RESET_STATE'


export const getAppointmentDate = (params) => {
    return { type: GET_APPOINTMENT_DATE, params }
}

export const getAppointmentDateSuccess = (response) => {
    return { type: GET_APPOINTMENT_DATE_SUCCESS, response }
}

export const getAppointmentDateAlert = (response) => {
    return { type: GET_APPOINTMENT_DATE_ALERT, response }
}

export const getAppointmentDateFail = (response) => {
    return { type: GET_APPOINTMENT_DATE_FAIL, response }
}

export const getAppointmentDateResetState = () => {
    return { type: GET_APPOINTMENT_DATE_RESET_STATE }
}
