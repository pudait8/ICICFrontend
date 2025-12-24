import {
    GET_GRIEVANCE_DETAIL,
    GET_GRIEVANCE_DETAIL_SUCCESS,
    GET_GRIEVANCE_DETAIL_FAIL,
    GET_GRIEVANCE_DETAIL_ALERT,
    GET_GRIEVANCE_DETAIL_RESET_STATE,
} from "../actions/getGrievanceDetailAction"


const initialState = {
    apiState: "", // loading, ideal, alert, error
    data: {},
    apiMessage: "",
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_GRIEVANCE_DETAIL:
            return {
                ...state,
                apiState: "loading",
            }

        case GET_GRIEVANCE_DETAIL_SUCCESS:
            return {
                ...state,
                apiState: "success",
                data: action.response.data.CustomObject,
            }

        case GET_GRIEVANCE_DETAIL_FAIL:
            return {
                ...state,
                apiState: "error",
                data: {},
            }

        case GET_GRIEVANCE_DETAIL_ALERT:
            return {
                ...state,
                apiState: "alert",
                apiMessage: action.response.data.Message,
                data: {},
            }

        case GET_GRIEVANCE_DETAIL_RESET_STATE:
            return initialState

        default:
            return state
    }
}
