import {
    CITIZEN_SIGNUP_RESEND_OTP,
    CITIZEN_SIGNUP_RESEND_OTP_SUCCESS,
    CITIZEN_SIGNUP_RESEND_OTP_FAIL,
    CITIZEN_SIGNUP_RESEND_OTP_ALERT,
    CITIZEN_SIGNUP_RESEND_OTP_RESET_STATE,
} from '../actions/citizenSignupResendOtpAction'
import strings from "../strings.json"

const initialState = {
    apiState: "", // loading, success, alert, error
    apiMessage: "",
    data: {},
}

export default function (state = initialState, action) {
    switch (action.type) {
        case CITIZEN_SIGNUP_RESEND_OTP:
            return {
                ...state,
                apiState: "loading",
            }

        case CITIZEN_SIGNUP_RESEND_OTP_SUCCESS:
            return {
                ...state,
                apiState: "success",
                data: action.response.data.CustomObject,
                apiMessage: action.response.data.Message
            }

        case CITIZEN_SIGNUP_RESEND_OTP_ALERT:
            return {
                ...state,
                apiState: "alert",
                apiMessage: action.response.data.Message
            }

        case CITIZEN_SIGNUP_RESEND_OTP_FAIL:
            return {
                ...state,
                apiState: "error",
                apiMessage: strings.api_err_msg
            }

        case CITIZEN_SIGNUP_RESEND_OTP_RESET_STATE:
            return initialState

        default:
            return state
    }
}
