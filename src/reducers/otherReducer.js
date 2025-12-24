import {
    APPLY_FOR_APPLICATION,
    APPLY_FOR_APPLICATION_RESET,
    OPEN_LOGIN_SECTION,
    OPEN_LOGIN_SECTION_RESET,
    OPEN_REGISTRATION_SECTION,
    OPEN_REGISTRATION_SECTION_RESET,
} from '../actions/otherAction'


const initialState = {
    applyForApplication: false,
    openLoginSection: false,
    openRegistrationSection: false,
}

export default function (state = initialState, action) {
    switch (action.type) {
        case APPLY_FOR_APPLICATION:
            return {
                ...state,
                applyForApplication: true,
            }

        case APPLY_FOR_APPLICATION_RESET:
            return {
                ...state,
                applyForApplication: false,
            }

        case OPEN_LOGIN_SECTION:
            return {
                ...state,
                openLoginSection: true,
            }

        case OPEN_LOGIN_SECTION_RESET:
            return {
                ...state,
                openLoginSection: false,
            }

        case OPEN_REGISTRATION_SECTION:
            return {
                ...state,
                openRegistrationSection: true,
            }

        case OPEN_REGISTRATION_SECTION_RESET:
            return {
                ...state,
                openRegistrationSection: false,
            }

        default:
            return state
    }
}
