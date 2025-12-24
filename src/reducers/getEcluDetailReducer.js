import {
    GET_ECLU_DETAIL,
    GET_ECLU_DETAIL_SUCCESS,
    GET_ECLU_DETAIL_FAIL,
    GET_ECLU_DETAIL_ALERT,
    GET_ECLU_DETAIL_RESET_STATE,
} from "../actions/getEcluDetailAction"


const initialState = {
    apiState: "", // loading, ideal, alert, error
    data: {},
    apiMessage: "",
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_ECLU_DETAIL:
            return {
                ...state,
                apiState: "loading",
            }

        case GET_ECLU_DETAIL_SUCCESS:
            return {
                ...state,
                apiState: "success",
                data: action.response.data.CustomObject,
            }

        case GET_ECLU_DETAIL_FAIL:
            return {
                ...state,
                apiState: "error",
                data: {},
            }

        case GET_ECLU_DETAIL_ALERT:
            return {
                ...state,
                apiState: "alert",
                apiMessage: action.response.data.Message,
                data: {},
            }

        case GET_ECLU_DETAIL_RESET_STATE:
            return initialState

        default:
            return state
    }
}
