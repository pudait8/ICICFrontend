import conf from '../config'
import axios from 'axios'
import { getAuthData } from '../utils'

const loginApi = async (params) => {

    let AuthId = getAuthData().AuthId
    let AuthKey = getAuthData().AuthKey

    const response = await axios({
        method: 'post',
        url: `${conf.api.base_url}Gateway_PostAuthPortalService/LogOut`,
        data: {
            "ApiKey": "LogoutCitizenFromPortal",
            "OrgId": 0,
            "ApiParams": {}
        },
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "AuthToken": AuthId,
            "AuthTokenKey": AuthKey,
            // "Language": getLang(),

            // "FormURL": windowPath(),
            // "GeoLocation": getGeoLocation(),
        }
    });

    return response
};

export default loginApi