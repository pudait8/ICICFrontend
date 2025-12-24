import {
    GET_AUTO_PROPERTY_HEAD_LIST,
    GET_AUTO_PROPERTY_HEAD_LIST_SUCCESS,
    GET_AUTO_PROPERTY_HEAD_LIST_FAIL,
    GET_AUTO_PROPERTY_HEAD_LIST_ALERT,
    GET_AUTO_PROPERTY_HEAD_LIST_RESET_STATE,
} from '../actions/getAutoPropertyHeadListAction'


const initialState = {
    apiState: "", // loading, success, alert, error
    apiMessage: "",
    data: {},
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_AUTO_PROPERTY_HEAD_LIST:
            return {
                ...state,
                apiState: "loading",
            }

        case GET_AUTO_PROPERTY_HEAD_LIST_SUCCESS:
            return {
                ...state,
                apiState: "success",
                data: action.response.data.CustomObject
            }

        case GET_AUTO_PROPERTY_HEAD_LIST_ALERT:
            return {
                ...state,
                apiState: "alert",
                apiMessage: action.response.data.Message
            }

        case GET_AUTO_PROPERTY_HEAD_LIST_FAIL:
            return {
                ...state,
                apiState: "error",
            }

        case GET_AUTO_PROPERTY_HEAD_LIST_RESET_STATE:
            return initialState

        default:
            return state
    }
}
