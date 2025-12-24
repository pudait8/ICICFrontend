import {
    GET_ENTREPRENEUR_DETAIL_BY_PAN,
    GET_ENTREPRENEUR_DETAIL_BY_PAN_SUCCESS,
    GET_ENTREPRENEUR_DETAIL_BY_PAN_FAIL,
    GET_ENTREPRENEUR_DETAIL_BY_PAN_ALERT,
    GET_ENTREPRENEUR_DETAIL_BY_PAN_RESET_STATE,
} from '../actions/getEntrepreneurDetailByPanAction'


const initialState = {
    apiState: "", // loading, success, alert, error
    alertMessage: "",
    data: {},
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_ENTREPRENEUR_DETAIL_BY_PAN:
            return {
                ...state,
                apiState: "loading",
            }

        case GET_ENTREPRENEUR_DETAIL_BY_PAN_SUCCESS:
            return {
                ...state,
                apiState: "success",
                data: action.response.data.CustomObject,
            }

        case GET_ENTREPRENEUR_DETAIL_BY_PAN_ALERT:
            return {
                ...state,
                apiState: "alert",
                alertMessage: action.response.data.Message
            }

        case GET_ENTREPRENEUR_DETAIL_BY_PAN_FAIL:
            return {
                ...state,
                apiState: "error",
            }

        case GET_ENTREPRENEUR_DETAIL_BY_PAN_RESET_STATE:
            return initialState

        default:
            return state
    }
}
