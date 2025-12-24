import {
    GET_PROPERTY_BASIC_DETAIL,
    GET_PROPERTY_BASIC_DETAIL_SUCCESS,
    GET_PROPERTY_BASIC_DETAIL_FAIL,
    GET_PROPERTY_BASIC_DETAIL_ALERT,
    RESET_STATE_GET_PROPERTY_BASIC_DETAIL,
} from "../actions/getPropertyBasicDetailAction"


const initialState = {
    uiState: "", // loading, ideal, error
    data: {},
    CurrentOwners: [],
    FirstAllottees: [],
    OtherDetails: {}
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_PROPERTY_BASIC_DETAIL:
            return {
                ...state,
                uiState: "loading",
            }

        case GET_PROPERTY_BASIC_DETAIL_SUCCESS:
            return {
                ...state,
                uiState: "ideal",
                data: action.response.data.CustomObject,
                CurrentOwners: action.response.data.CustomObject.CurrentOwners,
                FirstAllottees: action.response.data.CustomObject.FirstAllottees,
                OtherDetails: action.response.data.CustomObject.OtherDetails,
            }

        case GET_PROPERTY_BASIC_DETAIL_FAIL:
            return {
                ...state,
                list: [],
                uiState: "error",
            }

        case GET_PROPERTY_BASIC_DETAIL_ALERT:
            return {
                ...state,
                list: [],
                uiState: "error",
            }

        case RESET_STATE_GET_PROPERTY_BASIC_DETAIL:
            return {
                ...state,
                uiState: "",
                data: {},
                CurrentOwners: [],
                FirstAllottees: [],
                OtherDetails: {}
            }

        default:
            return state
    }
}
