import {
    SAVE_APPLICATION,
    SAVE_APPLICATION_SUCCESS,
    SAVE_APPLICATION_FAIL,
    SAVE_APPLICATION_ALERT,
} from "../actions/ApplyForServiceAction"


const initialState = {
    apiState: "", // loading, success, alert, error
    alertMessage: "",
    data: {},
}

export default function (state = initialState, action) {
    switch (action.type) {
        case SAVE_APPLICATION:
            return {
                ...state,
                apiState: "loading",
            }

        case SAVE_APPLICATION_SUCCESS:
            return {
                ...state,
                apiState: "success",
                data: action.response.data.CustomObject,
            }

        case SAVE_APPLICATION_FAIL:
            return {
                ...state,
                apiState: "error",
            }

        case SAVE_APPLICATION_ALERT:
            return {
                ...state,
                apiState: "alert",
                alertMessage: action.response.data.Message
            }

        default:
            return state
    }
}