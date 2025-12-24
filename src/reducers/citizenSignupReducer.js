import {
    CITIZEN_SIGNUP,
    CITIZEN_SIGNUP_SUCCESS,
    CITIZEN_SIGNUP_FAIL,
    CITIZEN_SIGNUP_ALERT,
    CITIZEN_SIGNUP_RESET_STATE,
} from '../actions/citizenSignupAction'
import strings from "../strings.json"

const initialState = {
    apiState: "", // loading, success, alert, error
    apiMessage: "",
    data: {},
}

export default function (state = initialState, action) {
    switch (action.type) {
        case CITIZEN_SIGNUP:
            return {
                ...state,
                apiState: "loading",
            }

        case CITIZEN_SIGNUP_SUCCESS:
            return {
                ...state,
                apiState: "success",
                data: action.response.data.CustomObject,
                apiMessage: action.response.data.Message
            }

        case CITIZEN_SIGNUP_ALERT:
            return {
                ...state,
                apiState: "alert",
                apiMessage: action.response.data.Message
            }

        case CITIZEN_SIGNUP_FAIL:
            return {
                ...state,
                apiState: "error",
                apiMessage: strings.api_err_msg
            }

        case CITIZEN_SIGNUP_RESET_STATE:
            return initialState

        default:
            return state
    }
}
