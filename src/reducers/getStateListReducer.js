import {
    GET_STATE_LIST,
    GET_STATE_LIST_SUCCESS,
    GET_STATE_LIST_FAIL,
    GET_STATE_LIST_ALERT,
    GET_STATE_LIST_RESET_STATE,
} from '../actions/getStateListAction'


const initialState = {
    apiState: "", // loading, success, alert, error
    apiMessage: "",
    list: [],
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_STATE_LIST:
            return {
                ...state,
                apiState: "loading",
            }

        case GET_STATE_LIST_SUCCESS:
            return {
                ...state,
                apiState: "success",
                list: action.response.data.CustomObject
            }

        case GET_STATE_LIST_ALERT:
            return {
                ...state,
                apiState: "alert",
                apiMessage: action.response.data.Message
            }

        case GET_STATE_LIST_FAIL:
            return {
                ...state,
                apiState: "error",
            }

        case GET_STATE_LIST_RESET_STATE:
            return initialState

        default:
            return state
    }
}
