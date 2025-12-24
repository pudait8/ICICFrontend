import {
    LOGOUT,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    LOGOUT_ALERT,
    LOGOUT_RESET_STATE,
} from '../actions/logoutAction'
import strings from "../strings.json"
import { notification } from "antd"

const initialState = {
    apiState: "", // loading, success, alert, error
    apiMessage: "",
    data: {},
}

export default function (state = initialState, action) {
    switch (action.type) {
        case LOGOUT:
            return {
                ...state,
                apiState: "loading",
            }

        case LOGOUT_SUCCESS:
            localStorage.removeItem("PudaAuthUser")
            localStorage.removeItem("PudaAuthId")
            localStorage.removeItem("PudaAuthKey")
            localStorage.removeItem("PudaIsIntroDisplayed")
            notification["success"]({
                message: "You are logged out successfully.",
                placement: "bottomRight"
            })
            return {
                ...state,
                apiState: "success",
                data: action.response.data.CustomObject
            }

        case LOGOUT_ALERT:
            return {
                ...state,
                apiState: "alert",
                apiMessage: action.response.data.Message
            }

        case LOGOUT_FAIL:
            return {
                ...state,
                apiState: "error",
                apiMessage: strings.api_err_msg
            }

        case LOGOUT_RESET_STATE:
            return initialState

        default:
            return state
    }
}
