import {
    GET_PROPERTY_DETAIL_BY_NOC_NUMBER,
    GET_PROPERTY_DETAIL_BY_NOC_NUMBER_SUCCESS,
    GET_PROPERTY_DETAIL_BY_NOC_NUMBER_FAIL,
    GET_PROPERTY_DETAIL_BY_NOC_NUMBER_ALERT,
    GET_PROPERTY_DETAIL_BY_NOC_NUMBER_RESET_STATE,
} from '../actions/getPropertyDetailByNocNumberActions'


const initialState = {
    apiState: "", // loading, success, alert, error
    apiMessage: "",
    data: {},
    CurrentOwners: [],
    FirstAllottees: [],
    Transferees: [],
    OtherDetails: {}
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_PROPERTY_DETAIL_BY_NOC_NUMBER:
            return {
                ...state,
                apiState: "loading",
            }

        case GET_PROPERTY_DETAIL_BY_NOC_NUMBER_SUCCESS:
            return {
                ...state,
                apiState: "success",
                data: action.response.data.CustomObject,
                CurrentOwners: action.response.data.CustomObject.CurrentOwners,
                Transferees: action.response.data.CustomObject.TransfereeDetails,
                FirstAllottees: action.response.data.CustomObject.FirstAllottees,
                OtherDetails: action.response.data.CustomObject.OtherDetails,
                apiMessage: action.response.data.Message
            }

        case GET_PROPERTY_DETAIL_BY_NOC_NUMBER_ALERT:
            return {
                ...state,
                apiState: "alert",
                apiMessage: action.response.data.Message
            }

        case GET_PROPERTY_DETAIL_BY_NOC_NUMBER_FAIL:
            return {
                ...state,
                apiState: "error",
                apiMessage: action.response.data.Message
            }

        case GET_PROPERTY_DETAIL_BY_NOC_NUMBER_RESET_STATE:
            return {
                ...state,
                apiState: "",
                alertMessage: "",
                CurrentOwners: [],
                FirstAllottees: [],
                OtherDetails: {}
            }

        default:
            return state
    }
}
