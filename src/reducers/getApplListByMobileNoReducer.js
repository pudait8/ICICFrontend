import {
    GET_APPL_LIST_BY_MOBILE_NO,
    GET_APPL_LIST_BY_MOBILE_NO_SUCCESS,
    GET_APPL_LIST_BY_MOBILE_NO_FAIL,
    GET_APPL_LIST_BY_MOBILE_NO_ALERT,
    GET_APPL_LIST_BY_MOBILE_NO_RESET_STATE,
} from '../actions/getApplListByMobileNoAction'


const initialState = {
    apiState: "", // loading, success, alert, error
    apiMessage: "",
    list: [],
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_APPL_LIST_BY_MOBILE_NO:
            return {
                ...state,
                apiState: "loading",
            }

        case GET_APPL_LIST_BY_MOBILE_NO_SUCCESS:
            return {
                ...state,
                apiState: "success",
                list: action.response.data.CustomObject
            }

        case GET_APPL_LIST_BY_MOBILE_NO_ALERT:
            return {
                ...state,
                apiState: "alert",
                apiMessage: action.response.data.Message
            }

        case GET_APPL_LIST_BY_MOBILE_NO_FAIL:
            return {
                ...state,
                apiState: "error",
            }

        case GET_APPL_LIST_BY_MOBILE_NO_RESET_STATE:
            return initialState

        default:
            return state
    }
}
