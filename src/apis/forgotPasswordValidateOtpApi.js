import conf from '../config'
import axios from 'axios'
import { getAuthData } from '../utils'

const forgotPasswordSendOtpApi = async (params) => {

    let AuthId = getAuthData().AuthId
    let AuthKey = getAuthData().AuthKey

    const response = await axios({
        method: 'post',
        url: `${conf.api.base_url}Gateway_AuthService/ForgotPassword`,
        data: {
            "ApiKey": "ValidateOTPOnForgotPassword",
            "OrgId": 0,
            "ApiParams": params
        },
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "AuthToken": AuthId,
            "AuthTokenKey": AuthKey,
        }
    })

    return response
}

export default forgotPasswordSendOtpApi