import {
    DELETE_TRANSFER_APPLICATION,
    DELETE_TRANSFER_APPLICATION_SUCCESS,
    DELETE_TRANSFER_APPLICATION_FAIL,
    DELETE_TRANSFER_APPLICATION_ALERT,
} from '../actions/transferApplicationDeleteActions'


const initialState = {
    apiState: "", // loading, success, alert, error
    alertMessage: "",
}

export default function (state = initialState, action) {
    switch (action.type) {
        case DELETE_TRANSFER_APPLICATION:
            return {
                ...state,
                apiState: "loading",
            }

        case DELETE_TRANSFER_APPLICATION_SUCCESS:
            return {
                ...state,
                apiState: "success",
            }

        case DELETE_TRANSFER_APPLICATION_ALERT:
            return {
                ...state,
                apiState: "alert",
                alertMessage: action.response.data.Message
            }

        case DELETE_TRANSFER_APPLICATION_FAIL:
            return {
                ...state,
                apiState: "error",
            }

        default:
            return state
    }
}
