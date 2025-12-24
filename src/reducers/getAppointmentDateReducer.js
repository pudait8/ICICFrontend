import {
    GET_APPOINTMENT_DATE,
    GET_APPOINTMENT_DATE_SUCCESS,
    GET_APPOINTMENT_DATE_FAIL,
    GET_APPOINTMENT_DATE_ALERT,
    GET_APPOINTMENT_DATE_RESET_STATE,
} from '../actions/getAppointmentDateAction'


const initialState = {
    apiState: "", // loading, success, alert, error
    apiMessage: "",
    data: [],
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_APPOINTMENT_DATE:
            return {
                ...state,
                apiState: "loading",
            }

        case GET_APPOINTMENT_DATE_SUCCESS:
            return {
                ...state,
                apiState: "success",
                data: action.response.data.CustomObject
            }

        case GET_APPOINTMENT_DATE_ALERT:
            return {
                ...state,
                apiState: "alert",
                apiMessage: action.response.data.Message
            }

        case GET_APPOINTMENT_DATE_FAIL:
            return {
                ...state,
                apiState: "error",
            }

        case GET_APPOINTMENT_DATE_RESET_STATE:
            return initialState

        default:
            return state
    }
}
