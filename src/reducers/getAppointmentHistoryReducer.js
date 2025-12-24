import {
    GET_APPOINTMENT_HISTORY,
    GET_APPOINTMENT_HISTORY_SUCCESS,
    GET_APPOINTMENT_HISTORY_FAIL,
    GET_APPOINTMENT_HISTORY_ALERT,
    GET_APPOINTMENT_HISTORY_RESET_STATE,
} from '../actions/getAppointmentHistoryAction'


const initialState = {
    apiState: "", // loading, success, alert, error
    apiMessage: "",
    data: [],
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_APPOINTMENT_HISTORY:
            return {
                ...state,
                apiState: "loading",
            }

        case GET_APPOINTMENT_HISTORY_SUCCESS:
            return {
                ...state,
                apiState: "success",
                data: action.response.data.CustomObject
            }

        case GET_APPOINTMENT_HISTORY_ALERT:
            return {
                ...state,
                apiState: "alert",
                apiMessage: action.response.data.Message
            }

        case GET_APPOINTMENT_HISTORY_FAIL:
            return {
                ...state,
                apiState: "error",
            }

        case GET_APPOINTMENT_HISTORY_RESET_STATE:
            return initialState

        default:
            return state
    }
}
