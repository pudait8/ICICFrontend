import conf from '../config'
import axios from 'axios'
import { getLang, windowPath, getGeoLocation } from '../utils'

const loginApi = async (params) => {

    const response = await axios({
        method: 'post',
        url: `${conf.api.base_url}Gateway_AuthService/ValidateLogin`,
        data: {
            ApiKey: "ValidateCitizenLoginFromPortal",
            OrgId: 0,
            ApiParams: {
                LoginId: params.username,
                Password: params.password,
                LoginSource: "CitizenPortal",
                LoginType: "LoginId/Mobile/Email"
            }
        },
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            // "Language": getLang(),
            // "FormURL": windowPath(),
            // "GeoLocation": getGeoLocation(),
        }
    });

    return response
};

export default loginApi