import conf from '../config'
import axios from 'axios'

const fetchPropertyTypesList = async (params) => {
    const response = await axios({
        method: 'post',
        url: `${conf.api.base_url}Gateway_AuthService/ViewDetail`,
        data: {
            "ApiKey": "GetPropertyMappedPropetyTypeList",
            "OrgId": params.AuthorityId,
            "ApiParams": {
                "SectorId": params.SectorId,
                "UsageTypeId": params.UsageTypeId
            }
        },
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            // "AuthToken": params.AuthToken,
            // "AuthTokenKey": params.AuthTokenKey,
        }
    });

    return response
}

export default fetchPropertyTypesList