import {
    RE_SUBMIT_FOR_SCRUTINY,
    RE_SUBMIT_FOR_SCRUTINY_SUCCESS,
    RE_SUBMIT_FOR_SCRUTINY_FAIL,
    RE_SUBMIT_FOR_SCRUTINY_ALERT,
    RE_SUBMIT_FOR_SCRUTINY_RESET_STATE,
} from '../actions/reSubmitForScrutinyAction'
import strings from "../strings.json"

const initialState = {
    apiState: "", // loading, success, alert, error
    apiMessage: "",
    data: {},
}

export default function (state = initialState, action) {
    switch (action.type) {
        case RE_SUBMIT_FOR_SCRUTINY:
            return {
                ...state,
                apiState: "loading",
            }

        case RE_SUBMIT_FOR_SCRUTINY_SUCCESS:
            return {
                ...state,
                apiState: "success",
                data: action.response.data.CustomObject,
                apiMessage: action.response.data.Message
            }

        case RE_SUBMIT_FOR_SCRUTINY_ALERT:
            return {
                ...state,
                apiState: "alert",
                apiMessage: action.response.data.Message
            }

        case RE_SUBMIT_FOR_SCRUTINY_FAIL:
            return {
                ...state,
                apiState: "error",
                apiMessage: strings.api_err_msg
            }

        case RE_SUBMIT_FOR_SCRUTINY_RESET_STATE:
            return initialState

        default:
            return state
    }
}
