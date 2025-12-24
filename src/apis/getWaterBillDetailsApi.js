import conf from '../config'
import axios from 'axios'
import { getGeoLocation } from '../utils'

const getWaterBillDetailsApi = async (params) => {


    const response = await axios({
        method: 'post',
        url: `${conf.api.base_url}Gateway_AuthService/ViewDetail`,
        data: {
            "ApiKey": "GetWaterBillDetails",
            "OrgId": params.OrgId,
            "ApiParams": {
                "Type": params.Type,
                "KNO": params.KNO,
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

export default getWaterBillDetailsApi