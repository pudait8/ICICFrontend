import {
    GET_GRIEVANCE_DESG_LIST,
    GET_GRIEVANCE_DESG_LIST_SUCCESS,
    GET_GRIEVANCE_DESG_LIST_FAIL,
    GET_GRIEVANCE_DESG_LIST_ALERT,
    GET_GRIEVANCE_DESG_LIST_RESET_STATE,
} from '../actions/getGrievanceDesgListAction'


const initialState = {
    apiState: "", // loading, success, alert, error
    apiMessage: "",
    list: [],
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_GRIEVANCE_DESG_LIST:
            return {
                ...state,
                apiState: "loading",
            }

        case GET_GRIEVANCE_DESG_LIST_SUCCESS:
            return {
                ...state,
                apiState: "success",
                list: action.response.data.CustomObject
            }

        case GET_GRIEVANCE_DESG_LIST_ALERT:
            return {
                ...state,
                apiState: "alert",
                apiMessage: action.response.data.Message
            }

        case GET_GRIEVANCE_DESG_LIST_FAIL:
            return {
                ...state,
                apiState: "error",
            }

        case GET_GRIEVANCE_DESG_LIST_RESET_STATE:
            return initialState

        default:
            return state
    }
}
