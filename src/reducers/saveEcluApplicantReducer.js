import {
    SAVE_ECLU_APPLICANT,
    SAVE_ECLU_APPLICANT_SUCCESS,
    SAVE_ECLU_APPLICANT_FAIL,
    SAVE_ECLU_APPLICANT_ALERT,
    SAVE_ECLU_APPLICANT_RESET_STATE,
} from '../actions/saveEcluApplicantAction'
import strings from "../strings.json"

const initialState = {
    apiState: "", // loading, success, alert, error
    apiMessage: "",
    data: {},
}

export default function (state = initialState, action) {
    switch (action.type) {
        case SAVE_ECLU_APPLICANT:
            return {
                ...state,
                apiState: "loading",
            }

        case SAVE_ECLU_APPLICANT_SUCCESS:
            return {
                ...state,
                apiState: "success",
                data: action.response.data.CustomObject,
                apiMessage: action.response.data.Message
            }

        case SAVE_ECLU_APPLICANT_ALERT:
            return {
                ...state,
                apiState: "alert",
                apiMessage: action.response.data.Message
            }

        case SAVE_ECLU_APPLICANT_FAIL:
            return {
                ...state,
                apiState: "error",
                apiMessage: strings.api_err_msg
            }

        case SAVE_ECLU_APPLICANT_RESET_STATE:
            return initialState

        default:
            return state
    }
}
