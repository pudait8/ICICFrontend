import {
    GET_NOC_BY_UPN,
    GET_NOC_BY_UPN_SUCCESS,
    GET_NOC_BY_UPN_FAIL,
    GET_NOC_BY_UPN_ALERT,
    GET_NOC_BY_UPN_RESET_STATE,
} from '../actions/getNocByUpnAction'


const initialState = {
    apiState: "", // loading, success, alert, error
    apiMessage: "",
    data: {},
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_NOC_BY_UPN:
            return {
                ...state,
                apiState: "loading",
            }

        case GET_NOC_BY_UPN_SUCCESS:
            return {
                ...state,
                apiState: "success",
                data: action.response.data.CustomObject,
                apiMessage: action.response.data.Message
            }

        case GET_NOC_BY_UPN_ALERT:
            return {
                ...state,
                apiState: "alert",
                apiMessage: action.response.data.Message
            }

        case GET_NOC_BY_UPN_FAIL:
            return {
                ...state,
                apiState: "error",
            }

        case GET_NOC_BY_UPN_RESET_STATE:
            return initialState

        default:
            return state
    }
}
