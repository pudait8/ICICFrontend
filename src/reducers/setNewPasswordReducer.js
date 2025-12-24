import {
    SET_NEW_PASSWORD,
    SET_NEW_PASSWORD_SUCCESS,
    SET_NEW_PASSWORD_FAIL,
    SET_NEW_PASSWORD_ALERT,
    SET_NEW_PASSWORD_RESET_STATE,
    SET_AUTH_TRANSACTION_NUMBER,
} from '../actions/setNewPasswordAction'
import strings from "../strings.json"

const initialState = {
    apiState: "", // loading, success, alert, error
    apiMessage: "",
    data: {},
    AuthTransactionNumber: "",
}

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_NEW_PASSWORD:
            return {
                ...state,
                apiState: "loading",
            }

        case SET_NEW_PASSWORD_SUCCESS:
            return {
                ...state,
                apiState: "success",
                data: action.response.data.CustomObject,
                apiMessage: action.response.data.Message
            }

        case SET_NEW_PASSWORD_ALERT:
            return {
                ...state,
                apiState: "alert",
                apiMessage: action.response.data.Message
            }

        case SET_NEW_PASSWORD_FAIL:
            return {
                ...state,
                apiState: "error",
                apiMessage: strings.api_err_msg
            }

        case SET_NEW_PASSWORD_RESET_STATE:
            return initialState

        case SET_AUTH_TRANSACTION_NUMBER:
            return {
                ...state,
                AuthTransactionNumber: action.AuthTransactionNumber
            }

        default:
            return state
    }
}
