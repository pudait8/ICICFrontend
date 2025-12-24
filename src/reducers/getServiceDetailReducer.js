import {
    GET_SERVICE_DETAIL,
    GET_SERVICE_DETAIL_SUCCESS,
    GET_SERVICE_DETAIL_FAIL,
    GET_SERVICE_DETAIL_ALERT,
    GET_SERVICE_DETAIL_RESET_STATE,
} from '../actions/getServiceDetailAction'


const initialState = {
    apiState: "", // loading, success, alert, error
    apiMessage: "",
    data: {},
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_SERVICE_DETAIL:
            return {
                ...state,
                apiState: "loading",
            }

        case GET_SERVICE_DETAIL_SUCCESS:
            return {
                ...state,
                apiState: "success",
                data: action.response.data.CustomObject
            }

        case GET_SERVICE_DETAIL_ALERT:
            return {
                ...state,
                apiState: "alert",
                apiMessage: action.response.data.Message
            }

        case GET_SERVICE_DETAIL_FAIL:
            return {
                ...state,
                apiState: "error",
            }

        case GET_SERVICE_DETAIL_RESET_STATE:
            return initialState

        default:
            return state
    }
}
