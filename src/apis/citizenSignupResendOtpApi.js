import conf from '../config'
import axios from 'axios'

const citizenSignupApi = async (params) => {

    const response = await axios({
        method: 'post',
        url: `${conf.api.base_url}Gateway_AuthService/ValidateCitizenRegistration`,
        data: {
            "ApiKey": "ValidateAndResendOTPOnCitizenRegistration",
            "OrgId": 0,
            "ApiParams": params
        },
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "AuthToken": params.AuthToken,
            "AuthTokenKey": params.AuthTokenKey,
        }
    })

    return response
}

export default citizenSignupApi