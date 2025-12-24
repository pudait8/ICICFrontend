import {
    GET_CURRENT_OWNERS_BY_PROPERTY_REF_ID,
    GET_CURRENT_OWNERS_BY_PROPERTY_REF_ID_SUCCESS,
    GET_CURRENT_OWNERS_BY_PROPERTY_REF_ID_FAIL,
    GET_CURRENT_OWNERS_BY_PROPERTY_REF_ID_ALERT,
    GET_CURRENT_OWNERS_BY_PROPERTY_REF_ID_RESET_STATE,
} from '../actions/getCurrentOwnersByPropertyRefIdAction'
import strings from "../strings.json"

const initialState = {
    apiState: "", // loading, success, alert, error
    apiMessage: "",
    list: [],
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_CURRENT_OWNERS_BY_PROPERTY_REF_ID:
            return {
                ...state,
                apiState: "loading",
            }

        case GET_CURRENT_OWNERS_BY_PROPERTY_REF_ID_SUCCESS:
            return {
                ...state,
                apiState: "success",
                list: action.response.data.CustomObject
            }

        case GET_CURRENT_OWNERS_BY_PROPERTY_REF_ID_ALERT:
            return {
                ...state,
                apiState: "alert",
                apiMessage: action.response.data.Message
            }

        case GET_CURRENT_OWNERS_BY_PROPERTY_REF_ID_FAIL:
            return {
                ...state,
                apiState: "error",
                apiMessage: strings.api_err_msg
            }

        case GET_CURRENT_OWNERS_BY_PROPERTY_REF_ID_RESET_STATE:
            return initialState

        default:
            return state
    }
}
