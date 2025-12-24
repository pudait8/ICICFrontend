import {
    FORGOT_PASSWORD_SEND_OTP,
    FORGOT_PASSWORD_SEND_OTP_SUCCESS,
    FORGOT_PASSWORD_SEND_OTP_FAIL,
    FORGOT_PASSWORD_SEND_OTP_ALERT,
    FORGOT_PASSWORD_SEND_OTP_RESET_STATE,
} from '../actions/forgotPasswordSendOtpAction'
import strings from "../strings.json"

const initialState = {
    apiState: "", // loading, success, alert, error
    apiMessage: "",
    data: {},
}

export default function (state = initialState, action) {
    switch (action.type) {
        case FORGOT_PASSWORD_SEND_OTP:
            return {
                ...state,
                apiState: "loading",
            }

        case FORGOT_PASSWORD_SEND_OTP_SUCCESS:
            return {
                ...state,
                apiState: "success",
                data: action.response.data.CustomObject,
                apiMessage: action.response.data.Message
            }

        case FORGOT_PASSWORD_SEND_OTP_ALERT:
            return {
                ...state,
                apiState: "alert",
                apiMessage: action.response.data.Message
            }

        case FORGOT_PASSWORD_SEND_OTP_FAIL:
            return {
                ...state,
                apiState: "error",
                apiMessage: strings.api_err_msg
            }

        case FORGOT_PASSWORD_SEND_OTP_RESET_STATE:
            return initialState

        default:
            return state
    }
}
