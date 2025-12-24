import conf from '../config'
import axios from 'axios'

export const getUpnApi = async (params) => {

    const response = await axios({
        method: 'post',
        url: `${conf.api.base_url}Gateway_AuthService/ViewDetail`,
        data: {
            "ApiKey": "ValidateKnowYourUPNData",
            "OrgId": params.AuthorityId,
            "ApiParams": {
                "OrgId": params.AuthorityId,
                "SectorId": params.SectorId,
                "UsageTypeId": params.UsageTypeId,
                "PropertyTypeId": params.PropertyTypeId,
                "PropertyRefId": params.PropertyNumberId,
                "AllotmentNumber": params.AllotmentNumber,
                "MobileNumber": params.MobileNumber,
            }
        },
        headers: {
            "Content-type": "application/json; charset=UTF-8",
        }
    });

    return response
}

export default getUpnApi