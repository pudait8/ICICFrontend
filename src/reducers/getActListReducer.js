import {
    GET_ACT_LIST,
    GET_ACT_LIST_SUCCESS,
    GET_ACT_LIST_FAIL,
    GET_ACT_LIST_ALERT,
} from '../actions/getActListAction'


const initialState = {
    apiState: "", // loading, success, alert, error
    alertMessage: "",
    list: [],
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_ACT_LIST:
            return {
                ...state,
                apiState: "loading",
            }

        case GET_ACT_LIST_SUCCESS:
            return {
                ...state,
                apiState: "success",
                list: action.response.data.CustomObject,
            }

        case GET_ACT_LIST_ALERT:
            return {
                ...state,
                apiState: "alert",
                alertMessage: action.response.data.Message
            }

        case GET_ACT_LIST_FAIL:
            return {
                ...state,
                apiState: "error",
            }

        default:
            return state
    }
}
