import {
    GET_DOCUMENT_LIST,
    GET_DOCUMENT_LIST_SUCCESS,
    GET_DOCUMENT_LIST_FAIL,
    GET_DOCUMENT_LIST_ALERT,
    GET_DOCUMENT_LIST_RESET_STATE,
} from '../actions/getDocumentListAction'


const initialState = {
    apiState: "", // loading, success, alert, error
    apiMessage: "",
    list: [],
    EntityId: null,
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_DOCUMENT_LIST:
            return {
                ...state,
                apiState: "loading",
            }

        case GET_DOCUMENT_LIST_SUCCESS:
            return {
                ...state,
                apiState: "success",
                list: action.response.data.CustomObject,
                EntityId: action.response.data.EntityId
            }

        case GET_DOCUMENT_LIST_ALERT:
            return {
                ...state,
                apiState: "alert",
                apiMessage: action.response.data.Message
            }

        case GET_DOCUMENT_LIST_FAIL:
            return {
                ...state,
                apiState: "error",
            }

        case GET_DOCUMENT_LIST_RESET_STATE:
            return initialState

        default:
            return state
    }
}
