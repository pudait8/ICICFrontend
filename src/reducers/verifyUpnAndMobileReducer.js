import {
    VERIFY_UPN_AND_MOBILE,
    VERIFY_UPN_AND_MOBILE_SUCCESS,
    VERIFY_UPN_AND_MOBILE_FAIL,
    VERIFY_UPN_AND_MOBILE_ALERT,
    VERIFY_UPN_AND_MOBILE_RESET_STATE,
} from '../actions/verifyUpnAndMobileAction'
import strings from "../strings.json"

const initialState = {
    apiState: "", // loading, success, alert, error
    apiMessage: "",
    data: {},
}

export default function (state = initialState, action) {
    switch (action.type) {
        case VERIFY_UPN_AND_MOBILE:
            return {
                ...state,
                apiState: "loading",
            }

        case VERIFY_UPN_AND_MOBILE_SUCCESS:
            return {
                ...state,
                apiState: "success",
                data: action.response.data.CustomObject,
                apiMessage: action.response.data.Message
            }

        case VERIFY_UPN_AND_MOBILE_ALERT:
            return {
                ...state,
                apiState: "alert",
                apiMessage: action.response.data.Message
            }

        case VERIFY_UPN_AND_MOBILE_FAIL:
            return {
                ...state,
                apiState: "error",
                apiMessage: action.response.data.Message
            }

        case VERIFY_UPN_AND_MOBILE_RESET_STATE:
            return initialState

        default:
            return state
    }
}
