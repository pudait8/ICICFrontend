import conf from '../config'
import axios from 'axios'

const architectLoginApi = async (params) => {

    const response = await axios({
        method: 'post',
        url: `${conf.api.base_url}Gateway_AuthService/ValidateCitizenRegistration`,
        data: {
            "ApiKey": "GetOTPForCitizenRegistration",
            "OrgId": 0,
            "ApiParams": {
                FirstName: params.first_name,
                MiddleName: "",
                LastName: params.last_name,
                DateOfBirth: params.dob,
                Gender: params.gender,
                MobileNumber: params.mobile,
                EmailAddress: params.email,
                UserName: params.username,
                Password: params.password,
                ConfirmPassword: params.confirm_password,
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

export default architectLoginApi