import conf from '../config'
import axios from 'axios'
import { getGeoLocation } from '../utils'

const getWebContentApi = async (params) => {

    const response = await axios({
        method: 'post',
        url: `${conf.api.base_url}Gateway_PortalService/GetList`,
        data: {
            "ApiKey": "GetWebInforListForPortal",
            "OrgId": params.OrgId,
            "ApiParams": {
                "SearchText": "",
                "CurrentPageNumber": 0,
                "PageSize": 10,
                "SortOrder": "",
                "FilterParams": {}
            }
        },
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            // "Language": getLang(),
            // "FormURL": windowPath(),
            "GeoLocation": getGeoLocation(),
        }
    })

    return response
}

export default getWebContentApi