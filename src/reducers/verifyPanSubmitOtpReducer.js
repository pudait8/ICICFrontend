import {
    VERIFY_PAN_SUBMIT_OTP,
    VERIFY_PAN_SUBMIT_OTP_SUCCESS,
    VERIFY_PAN_SUBMIT_OTP_FAIL,
    VERIFY_PAN_SUBMIT_OTP_ALERT,
    VERIFY_PAN_SUBMIT_OTP_RESET_STATE,
} from '../actions/verifyPanSubmitOtpAction'
import strings from "../strings.json"
import { isUserLoggedIn } from '../utils'

const initialState = {
    apiState: "", // loading, success, alert, error
    apiMessage: "",
    data: {},
    ArchitectToken: null,
    ArchitectTokenKey: null,
    submitApplication: false,
    nocNumber: 0,
    isUserLoggedIn: isUserLoggedIn(),
}

export default function (state = initialState, action) {
    switch (action.type) {
        case VERIFY_PAN_SUBMIT_OTP:
            return {
                ...state,
                apiState: "loading",
            }

        case VERIFY_PAN_SUBMIT_OTP_SUCCESS:
            return {
                ...state,
                apiState: "success",
                apiMessage: action.response.data.Message,
                data: action.response.data.CustomObject,
                isUserLoggedIn: true,
                ArchitectToken: action.response.headers.architecttoken,
                ArchitectTokenKey: action.response.headers.architecttokenkey,
            }

        case VERIFY_PAN_SUBMIT_OTP_ALERT:
            return {
                ...state,
                apiState: "alert",
                apiMessage: action.response.data.Message
            }

        case VERIFY_PAN_SUBMIT_OTP_FAIL:
            return {
                ...state,
                apiState: "error",
                apiMessage: action.response.data.Message,
            }

        case VERIFY_PAN_SUBMIT_OTP_RESET_STATE:
            return {
                apiState: "",
                apiMessage: "",
                data: {},
                ArchitectToken: null,
                ArchitectTokenKey: null,
                submitApplication: false,
                nocNumber: 0,
                isUserLoggedIn: isUserLoggedIn(),
            }

        default:
            return state
    }
}
