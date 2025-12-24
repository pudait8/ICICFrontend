import {
    SAVE_EDIT_PROFESSIONAL_SERVICE,
    SAVE_EDIT_PROFESSIONAL_SERVICE_SUCCESS,
    SAVE_EDIT_PROFESSIONAL_SERVICE_FAIL,
    SAVE_EDIT_PROFESSIONAL_SERVICE_ALERT,
    SAVE_EDIT_PROFESSIONAL_SERVICE_RESET_STATE,
} from '../actions/saveEditProfessionalServiceAction'
import strings from "../strings.json"

const initialState = {
    apiState: "", // loading, success, alert, error
    apiMessage: "",
    data: {},
}

export default function (state = initialState, action) {
    switch (action.type) {
        case SAVE_EDIT_PROFESSIONAL_SERVICE:
            return {
                ...state,
                apiState: "loading",
            }

        case SAVE_EDIT_PROFESSIONAL_SERVICE_SUCCESS:
            return {
                ...state,
                apiState: "success",
                data: action.response.data.CustomObject,
                apiMessage: action.response.data.Message
            }

        case SAVE_EDIT_PROFESSIONAL_SERVICE_ALERT:
            return {
                ...state,
                apiState: "alert",
                apiMessage: action.response.data.Message
            }

        case SAVE_EDIT_PROFESSIONAL_SERVICE_FAIL:
            return {
                ...state,
                apiState: "error",
                apiMessage: strings.api_err_msg
            }

        case SAVE_EDIT_PROFESSIONAL_SERVICE_RESET_STATE:
            return initialState

        default:
            return state
    }
}
