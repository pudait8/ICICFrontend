import conf from './../config'
import axios from 'axios'
import { getLang, windowPath, getGeoLocation } from '../utils'

export const getApplicationProgressApi = async (params) => {
    const response = await axios({
        method: 'post',
        url: `${conf.api.base_url}Gateway_PostAuthPortalService/GetData`,
        data: {
            "ApiKey": "ViewApplicationProgress",
            "OrgId": params.OrgId,
            "ApiParams": {
                "ApplicationId": params.ApplicationId
            }
        },
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "AuthToken": params.AuthToken,
            "AuthTokenKey": params.AuthTokenKey,
            "ArchitectToken": params.ArchitectToken,
            "ArchitectTokenKey": params.ArchitectTokenKey,
            // "Language": getLang(),
            // "FormURL": windowPath(),
            // "GeoLocation": getGeoLocation(),
        }
    });

    return response
}

export default getApplicationProgressApi