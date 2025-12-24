import {
    GET_PROPERTY_PERMISSIONS_DETAIL,
    GET_PROPERTY_PERMISSIONS_DETAIL_SUCCESS,
    GET_PROPERTY_PERMISSIONS_DETAIL_FAIL,
    GET_PROPERTY_PERMISSIONS_DETAIL_ALERT,
} from "../actions/getPropertyPermissionsDetailAction"


const initialState = {
    uiState: "", // loading, ideal, empty, error
    list: [],
    totalRecords: 0
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_PROPERTY_PERMISSIONS_DETAIL:
            return {
                ...state,
                uiState: "loading",
            }

        case GET_PROPERTY_PERMISSIONS_DETAIL_SUCCESS:
            if (action.response.data.CustomObject.length === 0) {
                return {
                    ...state,
                    uiState: "empty",
                    list: [],
                }
            } else {
                return {
                    ...state,
                    uiState: "ideal",
                    list: action.response.data.CustomObject,
                    totalRecords: action.response.data.FilteredRecordCount
                }
            }

        case GET_PROPERTY_PERMISSIONS_DETAIL_FAIL:
            return {
                ...state,
                list: [],
                uiState: "error",
            }

        case GET_PROPERTY_PERMISSIONS_DETAIL_ALERT:
            return {
                ...state,
                list: [],
                uiState: "error",
            }

        default:
            return state
    }
}
