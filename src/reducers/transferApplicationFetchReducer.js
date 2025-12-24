import {
    FETCH_TRANSFER_APPLICATION,
    FETCH_TRANSFER_APPLICATION_SUCCESS,
    FETCH_TRANSFER_APPLICATION_FAIL,
    FETCH_TRANSFER_APPLICATION_ALERT,
    RESET_STATE_FETCH_TRANSFER_APPLICATION,
} from '../actions/transferApplicationfetchActions'


const initialState = {
    apiState: "", // loading, success, error
    data: {},
}

export default function (state = initialState, action) {
    switch (action.type) {
        case FETCH_TRANSFER_APPLICATION:
            return {
                ...state,
                apiState: "loading",
            }

        case FETCH_TRANSFER_APPLICATION_SUCCESS:
            return {
                ...state,
                apiState: "success",
                data: action.response.data.CustomObject,
            }

        case FETCH_TRANSFER_APPLICATION_ALERT:
            return {
                ...state,
                apiState: "error",
            }

        case FETCH_TRANSFER_APPLICATION_FAIL:
            return {
                ...state,
                apiState: "error",
            }

        case RESET_STATE_FETCH_TRANSFER_APPLICATION:
            return {
                ...state,
                apiState: "",
                data: {},
            }

        default:
            return state
    }
}
