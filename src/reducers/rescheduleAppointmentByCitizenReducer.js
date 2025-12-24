import {
    RESCHEDULE_APPOINTMENT_BY_CITIZEN,
    RESCHEDULE_APPOINTMENT_BY_CITIZEN_SUCCESS,
    RESCHEDULE_APPOINTMENT_BY_CITIZEN_FAIL,
    RESCHEDULE_APPOINTMENT_BY_CITIZEN_ALERT,
    RESCHEDULE_APPOINTMENT_BY_CITIZEN_RESET_STATE,
} from '../actions/rescheduleAppointmentByCitizenAction'


const initialState = {
    apiState: "", // loading, success, alert, error
    apiMessage: "",
}

export default function (state = initialState, action) {
    switch (action.type) {
        case RESCHEDULE_APPOINTMENT_BY_CITIZEN:
            return {
                ...state,
                apiState: "loading",
            }

        case RESCHEDULE_APPOINTMENT_BY_CITIZEN_SUCCESS:
            return {
                ...state,
                apiState: "success",
                apiMessage: action.response.data.Message
            }

        case RESCHEDULE_APPOINTMENT_BY_CITIZEN_ALERT:
            return {
                ...state,
                apiState: "alert",
                apiMessage: action.response.data.Message
            }

        case RESCHEDULE_APPOINTMENT_BY_CITIZEN_FAIL:
            return {
                ...state,
                apiState: "error",
                apiMessage: action.response.data.Message
            }

        case RESCHEDULE_APPOINTMENT_BY_CITIZEN_RESET_STATE:
            return {
                ...state,
                apiState: "",
                apiMessage: "",
            }

        default:
            return state
    }
}
