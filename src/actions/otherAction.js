export const APPLY_FOR_APPLICATION = 'APPLY_FOR_APPLICATION'
export const APPLY_FOR_APPLICATION_RESET = 'APPLY_FOR_APPLICATION_RESET'

export const applyForApplication = () => {
    return { type: APPLY_FOR_APPLICATION }
}

export const applyForApplicationReset = () => {
    return { type: APPLY_FOR_APPLICATION_RESET }
}


export const OPEN_LOGIN_SECTION = 'OPEN_LOGIN_SECTION'
export const OPEN_LOGIN_SECTION_RESET = 'OPEN_LOGIN_SECTION_RESET'

export const openLoginSection = () => {
    return { type: OPEN_LOGIN_SECTION }
}

export const openLoginSectionReset = () => {
    return { type: OPEN_LOGIN_SECTION_RESET }
}


export const OPEN_REGISTRATION_SECTION = 'OPEN_REGISTRATION_SECTION'
export const OPEN_REGISTRATION_SECTION_RESET = 'OPEN_REGISTRATION_SECTION_RESET'

export const openRegistrationSection = () => {
    return { type: OPEN_REGISTRATION_SECTION }
}

export const openRegistrationSectionReset = () => {
    return { type: OPEN_REGISTRATION_SECTION_RESET }
}