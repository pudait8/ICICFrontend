import conf from '../config'
import axios from 'axios'

const forgotPasswordSendOtpApi = async (params) => {

    const response = await axios({
        method: 'post',
        url: `${conf.api.base_url}Gateway_AuthService/ForgotPassword`,
        data: {
            "ApiKey": "ForgotPasswordFormCitizenPortal",
            "OrgId": 0,
            "ApiParams": {
                "LoginId": params.LoginId,
                "MobileNumber": params.MobileNumber,
                "DateOfBirth": params.DateOfBirth
            }
        },
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "AuthToken": params.AuthToken,
            "AuthTokenKey": params.AuthTokenKey,
        }
    })

    return response
}

export default forgotPasswordSendOtpApi