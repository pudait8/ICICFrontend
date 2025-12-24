import conf from './../config'
import axios from 'axios'
import { getLang, windowPath, getGeoLocation } from '../utils'

const getAuthorityListApi = async (params) => {
    const response = await axios({
        method: 'post',
        url: `${conf.api.base_url}Gateway_PortalService/GetList`,
        data: {
            "ApiKey": "GetAuthorityListForPortal",
            "OrgId": 0,
            "ApiParams": {}
        },
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            // "AuthId": AuthId,
            // "AuthKey": AuthKey,
            // "Language": getLang(),
            // "FormURL": windowPath(),
            // "GeoLocation": getGeoLocation(),
        }
    });

    return response
};

export default getAuthorityListApi