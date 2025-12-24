import {
    GET_REGISTRATION_CATEGORY,
    GET_REGISTRATION_CATEGORY_SUCCESS,
    GET_REGISTRATION_CATEGORY_FAIL,
    GET_REGISTRATION_CATEGORY_ALERT,
    GET_REGISTRATION_CATEGORY_RESET_STATE,
} from '../actions/getRegistrationCategoryAction'


const initialState = {
    apiState: "", // loading, success, alert, error
    alertMessage: "",
    list: [],
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_REGISTRATION_CATEGORY:
            return {
                ...state,
                apiState: "loading",
            }

        case GET_REGISTRATION_CATEGORY_SUCCESS:
            return {
                ...state,
                apiState: "success",
                list: action.response.data.CustomObject,
            }

        case GET_REGISTRATION_CATEGORY_ALERT:
            return {
                ...state,
                apiState: "alert",
                alertMessage: action.response.data.Message
            }

        case GET_REGISTRATION_CATEGORY_FAIL:
            return {
                ...state,
                apiState: "error",
            }

        case GET_REGISTRATION_CATEGORY_RESET_STATE:
            return initialState

        default:
            return state
    }
}
