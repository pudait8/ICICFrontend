import {
    KNOW_YOUR_PROPERTY_VERIFY_UPN_AND_MOBILE,
    KNOW_YOUR_PROPERTY_VERIFY_UPN_AND_MOBILE_SUCCESS,
    KNOW_YOUR_PROPERTY_VERIFY_UPN_AND_MOBILE_FAIL,
    KNOW_YOUR_PROPERTY_VERIFY_UPN_AND_MOBILE_ALERT,
    KNOW_YOUR_PROPERTY_VERIFY_UPN_AND_MOBILE_RESET_STATE,
} from '../actions/knowYourPropertyVerifyUpnAndMobileAction'
import strings from "../strings.json"

const initialState = {
    apiState: "", // loading, success, alert, error
    apiMessage: "",
    data: {},
}

export default function (state = initialState, action) {
    switch (action.type) {
        case KNOW_YOUR_PROPERTY_VERIFY_UPN_AND_MOBILE:
            return {
                ...state,
                apiState: "loading",
            }

        case KNOW_YOUR_PROPERTY_VERIFY_UPN_AND_MOBILE_SUCCESS:
            return {
                ...state,
                apiState: "success",
                data: action.response.data.CustomObject,
                apiMessage: action.response.data.Message
            }

        case KNOW_YOUR_PROPERTY_VERIFY_UPN_AND_MOBILE_ALERT:
            return {
                ...state,
                apiState: "alert",
                apiMessage: action.response.data.Message
            }

        case KNOW_YOUR_PROPERTY_VERIFY_UPN_AND_MOBILE_FAIL:
            return {
                ...state,
                apiState: "error",
                apiMessage: action.response.data.Message
            }

        case KNOW_YOUR_PROPERTY_VERIFY_UPN_AND_MOBILE_RESET_STATE:
            return initialState

        default:
            return state
    }
}
