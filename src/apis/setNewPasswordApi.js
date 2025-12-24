import conf from '../config'
import axios from 'axios'
import { getAuthData } from '../utils'

const setNewPasswordApi = async (params) => {

    let AuthId = getAuthData().AuthId
    let AuthKey = getAuthData().AuthKey

    const response = await axios({
        method: 'post',
        url: `${conf.api.base_url}Gateway_AuthService/ForgotPassword`,
        data: {
            "ApiKey": "ResetPasswordFromPortal",
            "OrgId": 0,
            "ApiParams": {
                "AuthTransactionNumber": params.AuthTransactionNumber,
                "NewPassword": params.NewPassword,
                "ConfirmNewPassword": params.ConfirmNewPassword
            }
        },
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "AuthToken": AuthId,
            "AuthTokenKey": AuthKey,
        }
    })

    return response
}

export default setNewPasswordApi