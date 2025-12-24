import conf from '../config'
import axios from 'axios'
import { getGeoLocation } from '../utils'

const getServiceListApi = async (params) => {

    const response = await axios({
        method: 'post',
        url: `${conf.api.base_url}Gateway_PortalService/GetList`,
        data: {
            ApiKey: "GetPortalApplicationList",
            OrgId: params.OrgId,
            ApiParams: {
                SearchText: params.SearchText,
                PropertyRefId: 0
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

export default getServiceListApi