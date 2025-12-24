export const RESCHEDULE_APPOINTMENT_BY_CITIZEN = 'RESCHEDULE_APPOINTMENT_BY_CITIZEN'
export const RESCHEDULE_APPOINTMENT_BY_CITIZEN_SUCCESS = 'RESCHEDULE_APPOINTMENT_BY_CITIZEN_SUCCESS'
export const RESCHEDULE_APPOINTMENT_BY_CITIZEN_ALERT = 'RESCHEDULE_APPOINTMENT_BY_CITIZEN_ALERT'
export const RESCHEDULE_APPOINTMENT_BY_CITIZEN_FAIL = 'RESCHEDULE_APPOINTMENT_BY_CITIZEN_FAIL'
export const RESCHEDULE_APPOINTMENT_BY_CITIZEN_RESET_STATE = 'RESCHEDULE_APPOINTMENT_BY_CITIZEN_RESET_STATE'

export const rescheduleAppointmentByCitizen = (params) => {
    return { type: RESCHEDULE_APPOINTMENT_BY_CITIZEN, params }
}

export const rescheduleAppointmentByCitizenSuccess = (response) => {
    return { type: RESCHEDULE_APPOINTMENT_BY_CITIZEN_SUCCESS, response }
}

export const rescheduleAppointmentByCitizenAlert = (response) => {
    return { type: RESCHEDULE_APPOINTMENT_BY_CITIZEN_ALERT, response }
}

export const rescheduleAppointmentByCitizenFail = (response) => {
    return { type: RESCHEDULE_APPOINTMENT_BY_CITIZEN_FAIL, response }
}

export const rescheduleAppointmentByCitizenResetState = () => {
    return { type: RESCHEDULE_APPOINTMENT_BY_CITIZEN_RESET_STATE }
}