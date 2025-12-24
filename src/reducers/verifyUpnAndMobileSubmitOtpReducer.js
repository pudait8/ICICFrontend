import {
    VERIFY_UPN_AND_MOBILE_SUBMIT_OTP,
    VERIFY_UPN_AND_MOBILE_SUBMIT_OTP_SUCCESS,
    VERIFY_UPN_AND_MOBILE_SUBMIT_OTP_FAIL,
    VERIFY_UPN_AND_MOBILE_SUBMIT_OTP_ALERT,
    VERIFY_UPN_AND_MOBILE_SUBMIT_OTP_RESET_STATE,
} from '../actions/verifyUpnAndMobileSubmitOtpAction'
import strings from "../strings.json"

const initialState = {
    apiState: "", // loading, success, alert, error
    apiMessage: "",
    data: {},
    AuthToken: null,
    AuthTokenKey: null,
    ArchitectToken: null,
    ArchitectTokenKey: null,
    submitApplication: false,
    nocNumber: 0,
}

export default function (state = initialState, action) {
    switch (action.type) {
        case VERIFY_UPN_AND_MOBILE_SUBMIT_OTP:
            return {
                ...state,
                apiState: "loading",
                submitApplication: state.submitApplication,
                nocNumber: state.nocNumber,
            }

        case VERIFY_UPN_AND_MOBILE_SUBMIT_OTP_SUCCESS:
            return {
                ...state,
                apiState: "success",
                apiMessage: action.response.data.Message,
                data: action.response.data.CustomObject,
                AuthToken: action.response.headers.authtoken,
                AuthTokenKey: action.response.headers.authtokenkey
            }

        case VERIFY_UPN_AND_MOBILE_SUBMIT_OTP_ALERT:
            return {
                ...state,
                apiState: "alert",
                apiMessage: action.response.data.Message
            }

        case VERIFY_UPN_AND_MOBILE_SUBMIT_OTP_FAIL:
            return {
                ...state,
                apiState: "error",
                apiMessage: action.response.data.Message,
            }

        case VERIFY_UPN_AND_MOBILE_SUBMIT_OTP_RESET_STATE:
            return initialState

        default:
            return state
    }
}
