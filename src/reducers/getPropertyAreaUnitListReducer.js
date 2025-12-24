import {
    GET_PROPERTY_AREA_UNIT,
    GET_PROPERTY_AREA_UNIT_SUCCESS,
    GET_PROPERTY_AREA_UNIT_FAIL,
    GET_PROPERTY_AREA_UNIT_ALERT,
    RESET_STATE_GET_PROPERTY_AREA_UNIT,
} from '../actions/getPropertyAreaUnitListAction'


const initialState = {
    apiState: "", // loading, success, alert, error
    apiMessage: "",
    data: {},
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_PROPERTY_AREA_UNIT:
            return {
                ...state,
                apiState: "loading",
            }

        case GET_PROPERTY_AREA_UNIT_SUCCESS:
            return {
                ...state,
                apiState: "success",
                data: action.response.data.CustomObject,
            }

        case GET_PROPERTY_AREA_UNIT_ALERT:
            return {
                ...state,
                apiState: "alert",
                apiMessage: action.response.data.Message
            }

        case GET_PROPERTY_AREA_UNIT_FAIL:
            return {
                ...state,
                apiState: "error",
            }

        case RESET_STATE_GET_PROPERTY_AREA_UNIT:
            return initialState

        default:
            return state
    }
}
