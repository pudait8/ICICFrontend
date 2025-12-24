import {
    DELETE_GPA,
    DELETE_GPA_SUCCESS,
    DELETE_GPA_FAIL,
    DELETE_GPA_ALERT,
    DELETE_GPA_RESET_STATE,

} from '../actions/deleteGpaActions'


const initialState = {
    apiState: "", // loading, success, alert, error
    apiMessage: "",
}

export default function (state = initialState, action) {
    switch (action.type) {
        case DELETE_GPA:
            return {
                ...state,
                apiState: "loading",
            }

        case DELETE_GPA_SUCCESS:
            return {
                ...state,
                apiState: "success",
            }

        case DELETE_GPA_ALERT:
            return {
                ...state,
                apiState: "alert",
                apiMessage: action.response.data.Message
            }

        case DELETE_GPA_FAIL:
            return {
                ...state,
                apiState: "error",
            }

        case DELETE_GPA_RESET_STATE:
            return initialState


        default:
            return state
    }
}
