import {
    SAVE_MOBILE_NO,
    SAVE_MOBILE_NO_RESET
} from '../actions/mobileNoAction'


const initialState = {
    MobileNo: ""
}

export default function (state = initialState, action) {
    switch (action.type) {
        case SAVE_MOBILE_NO:
            return {
                ...state,
                MobileNo: action.params.mobile,
            }

        case SAVE_MOBILE_NO_RESET:
            return {
                initialState
            }

        default:
            return state
    }
}
